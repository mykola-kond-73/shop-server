import {Request,Response,NextFunction} from 'express'
const getSecretKeyToCreateAdmin=require('../env/getSecretKeyToCreateAdmin')

export const ChechSecretKeyToCreateAdmin=async(req:Request,res:Response,next:NextFunction)=>{
    if(req.body.isAdmin){
        const secretKey=await getSecretKeyToCreateAdmin()
        if(secretKey==req.body.secretKey){
            delete req.body.secretKey            
            next()
        }else{
            throw new Error('no valid secret key')
        }
    }else{
        next()
    }
    
}
