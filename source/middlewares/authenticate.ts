import { Request, Response, NextFunction } from 'express'
import { authErrorLogger } from '../utils/loger'
import { ApiError } from '../exceptions/exceptions'
import { tokenService } from '../services/token'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization

        if (!token) return next(ApiError.UnautorizedError())

        const [tokenType,accessToken]=token.split(' ')
        if(tokenType !== 'Bearer' || !accessToken) return next(ApiError.UnautorizedError())

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) return next(ApiError.UnautorizedError())
        
        next()
    } catch (error) {
        authErrorLogger.error(`${req.originalUrl} ${req.ip}`)
        return next(ApiError.UnautorizedError())
    }
}