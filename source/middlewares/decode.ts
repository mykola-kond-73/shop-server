import {Request,Response,NextFunction} from 'express'
import{ _decode} from '../utils/crypto/decode'

export const decode=async(req:Request,res:Response,next:NextFunction)=>{
    const emailUtf8=await _decode(req.body.email)
    const phoneUtf8=await _decode(req.body.phone)
    const nameUtf8=await _decode(req.body.name)
   
    req.body={
        ...req.body,
        email:emailUtf8,
        phone:phoneUtf8,
        name:nameUtf8
    }

    if(req.body.password){
        const passwordUtf8=await _decode(req.body.password)
        req.body={
            ...req.body,
            password:passwordUtf8
        }
    }

    if(req.body.secretKey){
        const secretKeyUtf8=await _decode(req.body.secretKey)
        req.body={
            ...req.body,
            secretKey:secretKeyUtf8
        }
    }
    
    next()
}