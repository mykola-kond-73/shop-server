import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../exceptions/exceptions'
import { errorLogger } from '../utils/loger'
import { Responce } from '../utils/responceObject'

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
        errorLogger.error(`status:${error.status} ${error.message}`)
        // return res.status(error.status).json(new Responce(error.status, error.message))
        return res.status(error.status).json(new Responce(error.status, 'Error'))
    } else {
        errorLogger.error(`status:500 ${error.message}`)
        return res.status(500).json(new Responce(500, 'Sory server error'))
    }
}