import { NextFunction, Request, Response } from 'express'
import { Responce } from '../utils/responceObject'
import { OrderFiltersType, OrderType } from '../types/models/ordersTypes'
import { GetDataType } from '../types/models/modelsTypes'
import { HashType } from '../types/models/modelsTypes'
import { UpdateOrderType } from '../types/models/ordersTypes'
import { ordersService } from '../services/orders'

class OrdersController{
    async getOredres (req: Request, res: Response,next:NextFunction) {
        try {
            const query: GetDataType<OrderFiltersType> = {
                page: Number(req.query.page),
                size: Number(req.query.size),
                filter: JSON.parse(String(req.query.filter))
            }
            const data = await ordersService.getAll(query)
    
            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async postOrders  (req: Request, res: Response,next:NextFunction)  {
        try {
            const data = await ordersService.create(req.body as OrderType)
    
            return res.status(201).json(new Responce(201, '', data))
        } catch (error: any) {
            next(error)
        }
    }   

    async getByHashOrders  (req: Request, res: Response,next:NextFunction) {
        try {
            const data = await ordersService.getByHash(req.params as HashType)
    
            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async putByHashOrders (req: Request, res: Response,next:NextFunction) {
        try {
            const query: UpdateOrderType = {
                hash: req.params.hash,
                payload: req.body
            }

            const data = await ordersService.updateByHash(query)

            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async deleteByHashOredrs  (req: Request, res: Response,next:NextFunction) {
        try {
            await ordersService.removeByHash(req.params as HashType)
    
            return res.status(204).json(new Responce(204))
        } catch (error: any) {
            next(error)
        }
    }
}

export const ordersController = new OrdersController()