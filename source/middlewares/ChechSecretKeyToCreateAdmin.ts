import {Request,Response,NextFunction} from 'express'
import { ApiError } from '../exceptions/exceptions'
import {getSecretKeyToCreateAdmin} from '../utils/env/getSecretKeyToCreateAdmin'

export const ChechSecretKeyToCreateAdmin=async(req:Request,res:Response,next:NextFunction)=>{
    if(req.body.isAdmin){
        const secretKey=await getSecretKeyToCreateAdmin()
        if(secretKey==req.body.secretKey){
            delete req.body.secretKey            
            next()
        }else{
            throw ApiError.BadRequest('no valid secret key')
        }
    }else{
        next()
    }
    
}
