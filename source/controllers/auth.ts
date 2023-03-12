import { NextFunction, Request, Response } from 'express'
import { Responce } from '../utils/responceObject'
import { authService } from '../services/auth'
import { _decode } from '../utils/crypto/decode'

//! res.cookie('user',data.refreshToken,{maxAge:12*60*60*1000,httpOnly:true})

//! const {user}=req.cookies
//! res.clearCookie('user')

class AuthController {
    async loginCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const payload={
                email:await _decode(req.body.email),
                password:await _decode(req.body.password)
            }

            const data = await authService.login(payload)
            req.session!.user = data.refreshToken

            return res.status(201).json(new Responce(201, '', data))
        } catch (error: any) {
            next(error)
        }
    }

    async loginStaff(req: Request, res: Response, next: NextFunction) {
        try {
            const payload={
                email:await _decode(req.body.email),
                password:await _decode(req.body.password)
            }
            const data = await authService.login(payload, true)
            req.session!.user = data.refreshToken

            return res.status(201).json(new Responce(201, '', data))
        } catch (error: any) {
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken=req.session!.user
            await authService.logout(refreshToken)
            delete req.session!.user

            return res.status(204).json(new Responce(204))
        } catch (error: any) {
            next(error)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken=req.session!.user
            const data=await authService.refresh(refreshToken)
            req.session!.user = data.refreshToken

            return res.status(201).json(new Responce(201, '', data))
        } catch (error: any) {
            next(error)
        }
    }
}

export const authController = new AuthController()