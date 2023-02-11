import { Request, Response } from 'express'
import { Responce } from '../../utils/responceObject'
import { OrdersControls } from '../../controllers/orders'
import { OrderFiltersType, OrderType } from '../../types/models/ordersTypes'
import { GetDataType } from '../../types/models/modelsTypes'
import { errorLogger } from '../../utils/loger'

const getOredres = async (req: Request, res: Response) => {
    try {
        const query: GetDataType<OrderFiltersType> = {
            page: Number(req.query.page),
            size: Number(req.query.size),
            filter: JSON.parse(String(req.query.filter))
        }
        const oredres = new OrdersControls(query)
        const data = await oredres.getAll()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no orders found'))
    }
}

const postOrders = async (req: Request, res: Response) => {
    try {
        const orders = new OrdersControls(req.body as OrderType)
        const data = await orders.create()

        return res.status(201).json(new Responce(201, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'failed to create order'))
    }
}

export {
    getOredres,
    postOrders
}