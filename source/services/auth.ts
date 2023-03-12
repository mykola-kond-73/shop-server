import bcrypt from 'bcrypt'
import { customersModel } from '../models/customers'
import { staffModel } from '../models/staff'
import { AuthCheckUserType, AuthDataType } from '../types/models/authTypes';
import { ApiError } from '../exceptions/exceptions';
import { tokenService } from './token';
import { UserDto } from '../dtos/userDto';

class AuthService {

    async login(payload: AuthDataType, isStaff: boolean = false) {
        const { email, password } = payload
        let data: AuthCheckUserType | {} = {}

        if (isStaff) {
            data = await staffModel.findOne({ email })
                .select('password email')
                .lean()
        } else {
            data = await customersModel.findOne({ email })
                .select('password email')
                .lean()
        }
        const result = await bcrypt.compare(password, (data as AuthCheckUserType).password)
        if (!result) throw ApiError.BadRequest('credentials not valid')

        const userDto = new UserDto(data as AuthCheckUserType)
        const tokens = await tokenService.generateTokens(userDto)
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            userId: userDto.id
        }
    }

    async logout(refreshToken:string) {
        if(!refreshToken) throw ApiError.UnautorizedError()

        const data=await tokenService.removeToken(refreshToken)
        return data
    }

    async refresh(refreshToken:string) {
        if(!refreshToken) throw ApiError.UnautorizedError()

        const userData:any=tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb=await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) throw ApiError.UnautorizedError()

        const userDto = new UserDto(userData)
        const tokens = await tokenService.generateTokens(userDto)
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            userId: userDto.id
        }
    }
}

export const authService = new AuthService()