import { ApiError } from '../exceptions/exceptions';
import {Request,Response,NextFunction} from 'express'
import Ajv from 'ajv'
import errorHandler from 'express-async-handler'
import {Responce} from '../utils/responceObject'
import {validationErrorLogger} from '../utils/loger'

export const validator = (schema:object) =>errorHandler(async (req:Request, res:Response, next:NextFunction) => {
    //*======синсхронна перевірка===========
    // const ajv=new Ajv({ allErrors: true })
    // const validate=ajv.compile(schema)
    // console.log(req.body)
    // const valid=validate(req.body)
    //*======синсхронна перевірка===========
    const ajv = new Ajv({
        allErrors: true,
        loadSchema: loadSchema
    })
    const validate = await ajv.compileAsync(schema)
    const valid = validate(req.body)

    if (valid) {
        next()
    } else {
        validationErrorLogger.error(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`)
        // res.status(400).json(new Responce(400, 'error validation'))
        next(ApiError.BadRequest('error validation'))
    }
}) 

async function loadSchema(uri:string) {
//todo    перевірити
    //@ts-ignore
    const res= await request.json(uri)
    if (res.statusCode >= 400) throw ApiError.BadRequest('Loading error: ' + res.statusCode)
    return res.body
    // return request.json(uri).then(function (res) {
    //   if (res.statusCode >= 400) throw new Error('Loading error: ' + res.statusCode);
    //   else return res.body;
    // });
}