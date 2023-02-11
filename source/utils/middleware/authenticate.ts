import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {Responce} from'../responceObject'
import {authErrorLogger} from '../loger'
import {key} from'../env/keys'

export const authenticate = (req:Request, res:Response, next:NextFunction) => {
    //*======================================================для заголовків=======================================================
    // if (!req.header('Authorization')) {
    //     return next(new Error('data for auth not found'))
    // }

    // const token = req.header('Authorization')
    // if (token) {
    //     jwt.verify(token, key, {
    //         maxAge: 60 * 60 * 1000
    //     }, (error, tokenVerify) => {
    //         if (tokenVerify) {
    //             next()
    //         } else if (error) {
    //             authErrorLogger.error(`${req.originalUrl} ${req.ip} ${token}`)
    //             res.status(401).json(new Responce(401, 'authentication credentials are not valid'))
    //         }
    //     })
    // } else {
    //     authErrorLogger.error(`${req.originalUrl} ${req.ip} ${token}`)
    //     res.status(401).json(new Responce(401, 'authentication credentials are not valid'))
    // }
    //*======================================================для заголовків=======================================================



    //*======================================================для сесій============================================================
    // console.log('================auth=================')
    // console.log(req.session)
    // console.log()
    // console.log(req.header('cookie: ','Cookie'))
    // console.log(req.header('set-cookie: ','Set-Cookie'))
    // console.log('================auth=================')
    if (!req.session!.user) {
        return next(new Error('cookie not found'))
    }

    const token = req.session!.user
    if (token) {
        jwt.verify(token, key!, {
            maxAge: 60 * 60 * 1000
        }, (error:any, tokenVerify:TokenVerifyType) => {
            if (tokenVerify) {
                next()
            } else if (error) {
                authErrorLogger.error(`${req.originalUrl} ${req.ip} ${token}`)
                res.status(401).json(new Responce(401, 'authentication credentials are not valid'))
            }
        })
    } else {
        authErrorLogger.error(`${req.originalUrl} ${req.ip} ${token}`)
        res.status(401).json(new Responce(401, 'authentication credentials are not valid'))
    }
}

type TokenVerifyType=string | jwt.JwtPayload | undefined