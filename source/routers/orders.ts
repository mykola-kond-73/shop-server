import express from 'express'
import {limiter} from '../middlewares/limiter'
import {validator} from '../middlewares/validator'
import {authenticate} from '../middlewares/authenticate'
import {createOrders} from '../schemas/createOrders'
import { ordersController } from '../controllers/orders'

const router=express.Router()

router.get('/',[limiter(5,60*1000),authenticate],ordersController.getOredres)
router.post('/',[limiter(5,60*1000),authenticate,validator(createOrders)],ordersController.postOrders)

router.get('/:hash',[limiter(5,60*1000),authenticate],ordersController.getByHashOrders)
router.put('/:hash',[limiter(5,60*1000),authenticate,validator(createOrders)],ordersController.putByHashOrders)
router.delete('/:hash',[limiter(5,60*1000)],authenticate,ordersController.deleteByHashOredrs)

export default router