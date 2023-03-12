import jwt from 'jsonwebtoken';
import { ReturnTokenType} from '../types/models/tokensTypes';
import { sessionModel } from '../models/session';
import { Types } from 'mongoose';
import { UserDto } from '../dtos/userDto';

class TokenService{
    
    validateAccessToken(token:string){
        try{
            const userData= jwt.verify(token,process.env.JWT_ACCESS_TOKEN!)
            return userData
        }catch(error){
            return null
        }
    }

    validateRefreshToken(token:string){
        try{
            const userData= jwt.verify(token,process.env.JWT_REFRESH_TOKEN!)
            return userData
        }catch(error){
            return null
        }
    }

    async generateTokens(data:UserDto):Promise<ReturnTokenType>{
        const accessToken = jwt.sign({...data}, process.env.JWT_ACCESS_TOKEN!, { expiresIn:'30m'})
        const refreshToken= jwt.sign({...data}, process.env.JWT_REFRESH_TOKEN!, { expiresIn: '12h' })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId:Types.ObjectId,token:string){
        const tokenData= await sessionModel.findOne({user:userId})
        if(tokenData){
            tokenData.refreshToken=token
            return tokenData.save()
        }
        const data=await sessionModel.create({user:userId,refreshToken:token})
        return data
    }

    async findToken(token:string){
        const data = await sessionModel.findOne({refreshToken:token})
        return data
    }

    async removeToken(token:string){
        const data=await sessionModel.findOneAndDelete({refreshToken:token})
        return data
    }
}

export const tokenService= new TokenService()