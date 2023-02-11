import { Request, Response } from 'express'
import { Responce } from '../../../utils/responceObject'
import { OrdersControls } from '../../../controllers/orders'
import { HashType } from '../../../types/models/modelsTypes'
import { UpdateOrderType } from '../../../types/models/ordersTypes'
import { errorLogger } from '../../../utils/loger'

const getByHashOrders = async (req: Request, res: Response) => {
    try {
        const orders = new OrdersControls(req.params as HashType)
        const data = await orders.getByHash()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no order was found for your query'))
    }
}

const putByHashOrders = async (req: Request, res: Response) => {
    try {
        const query: UpdateOrderType = {
            hash: req.params.hash,
            payload: req.body
        }

        const orders = new OrdersControls(query)
        const data = await orders.updateByHash()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no order was found for your query'))
    }
}

const deleteByHashOredrs = async (req: Request, res: Response) => {
    try {
        const orders = new OrdersControls(req.params as HashType)
        await orders.removeByHash()

        return res.status(204).json(new Responce(204))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no order was found for your query'))
    }
}

export {
    getByHashOrders,
    putByHashOrders,
    deleteByHashOredrs
}