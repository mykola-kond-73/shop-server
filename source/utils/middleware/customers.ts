import {Request,Response,NextFunction} from 'express'

const updatePostData=(req:Request,res:Response,next:NextFunction)=>{
    const data={
        ...req.body,
        emails:[
            {
                item:req.body.email,
                primary:true
            }
        ],
        phones:[
            {
                item:req.body.phone,
                primary:true
            }
        ]
    }
    delete data.email
    delete data.phone
    req.body=data
    next()
}

const updatePutData=(req:Request,res:Response,next:NextFunction)=>{
    const data={
        ...req.body,
        name:req.body.name.firstname+' '+req.body.name.lastname   
    }
    req.body=data
    next()
}

export{
    updatePostData,
    updatePutData
}