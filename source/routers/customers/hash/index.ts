import { Request, Response } from 'express'
import { Responce } from '../../../utils/responceObject'
import { CustomersControls } from '../../../controllers/customers'
import { HashType } from '../../../types/models/modelsTypes'
import { UpdateCustomerType } from '../../../types/models/customersType'
import { errorLogger } from '../../../utils/loger'

const getByHashCustomers = async (req: Request, res: Response) => {
    try {
        const customers = new CustomersControls(req.params as HashType)
        const data = await customers.getByHash()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no customer was found for your query'))
    }
}

const putByHashCustomers = async (req: Request, res: Response) => {
    try {
        const query: UpdateCustomerType = {
            hash: req.params.hash,
            payload: req.body
        }
        const customers = new CustomersControls(query)
        const data = await customers.updateByHash()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no customer was found for your query'))
    }
}

const deleteByHashCustomers = async (req: Request, res: Response) => {
    try {
        const customers = new CustomersControls(req.params as HashType)
        await customers.deleteByHash()

        return res.status(204).json(new Responce(204))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no customer was found for your query'))
    }
}

export {
    getByHashCustomers,
    putByHashCustomers,
    deleteByHashCustomers
}