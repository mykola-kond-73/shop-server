import { Request, Response } from 'express'
import { Responce } from '../../utils/responceObject'
import { AuthControl } from '../../controllers/auth'
import { errorLogger } from '../../utils/loger'

const authLogin = async (req: Request, res: Response) => {
    try {
        const autorization = Buffer.from(req.header('Authorization')!, 'base64').toString()
        const authArr = autorization.split(':')
        const query = {
            email: authArr[0],
            password: authArr[1]
        }
        const auth = new AuthControl(query)
        const authData = await auth.login()

        const data = {
            userId: authData.id
        }
        req.session!.user = authData.token
        return res.status(201).json(new Responce(201, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)
        return res.status(400).json(new Responce(400, 'customer not found'))
    }
}

const authLoginCust = async (req: Request, res: Response) => {
    try {
        const autorization = Buffer.from(req.header('Authorization')!, 'base64').toString()
        const authArr = autorization.split(':')
        const query = {
            email: authArr[0],
            password: authArr[1]
        }
        const auth = new AuthControl(query)
        const authData = await auth.loginCust()

        const data = {
            userId: authData.id
        }
        req.session!.user = authData.token
        return res.status(201).json(new Responce(201, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)
        return res.status(400).json(new Responce(400, 'customer not found'))
    }
}

const unlogin = async (req: Request, res: Response) => {
    try {
        // if(!req.session.user){
        //     return res.status(400).json(new Responce(400,'cookie not found'))
        // }
        
        delete req.session!.user
        return res.status(204).json(new Responce(204))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, error.message))
    }
}

export {
    authLogin,
    authLoginCust,
    unlogin
}