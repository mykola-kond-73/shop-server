import { Request, Response } from 'express'
import { Responce } from '../../utils/responceObject'
import { CustomersControls } from '../../controllers/customers'
import { CustomerFilterType, CustomerType } from '../../types/models/customersType'
import { GetDataType } from '../../types/models/modelsTypes'
import { errorLogger } from '../../utils/loger'

const getCustomers = async (req: Request, res: Response) => {
    try {
        const query: GetDataType<CustomerFilterType> = {
            page: Number(req.query.page),
            size: Number(req.query.size),
            filter: JSON.parse(String(req.query.filter))
        }
        const customers = new CustomersControls(query)
        const data = await customers.getAll()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)
        return res.status(400).json(new Responce(400, 'no clients found'))
    }
}

const postCustomers = async (req: Request, res: Response) => {
    try {
        const customers = new CustomersControls(req.body as CustomerType)
        const data = await customers.create()

        return res.status(201).json(new Responce(201, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'failed to create customer'))
    }
}

export {
    getCustomers,
    postCustomers
}