import {Request,Response,NextFunction} from 'express'
import {errorLogger} from '../loger'
import {Responce} from '../responceObject'

export const error=(error:any,req:Request,res:Response,next:NextFunction)=>{
    errorLogger.error(`status:400 ${error.message}`)
    res.status(400).json(new Responce(400,`Error:${error.message}`))
}