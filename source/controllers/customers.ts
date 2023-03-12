import { NextFunction, Request, Response } from 'express'
import { Responce } from '../utils/responceObject'
import { CustomerFilterType, CustomerType } from '../types/models/customersType'
import { GetDataType } from '../types/models/modelsTypes'
import { HashType } from '../types/models/modelsTypes'
import { UpdateCustomerType } from '../types/models/customersType'
import { customerService } from '../services/customers'

class CustomersController {
    async getCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const query: GetDataType<CustomerFilterType> = {
                page: Number(req.query.page),
                size: Number(req.query.size),
                filter: JSON.parse(String(req.query.filter))
            }
            
            const data = await customerService.getAll(query)

            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }

    async postCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await customerService.create(req.body as CustomerType)

            return res.status(201).json(new Responce(201, '', data))
        } catch (error: any) {
            next(error)
        }
    }

    async getByHashCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await customerService.getByHash(req.params as HashType)

            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }

    async putByHashCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const query: UpdateCustomerType = {
                hash: req.params.hash,
                payload: req.body
            }
            const data = await customerService.updateByHash(query)

            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }

    async deleteByHashCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            await customerService.deleteByHash(req.params as HashType)

            return res.status(204).json(new Responce(204))
        } catch (error: any) {
            next(error)
        }
    }
}

export const customersController = new CustomersController()