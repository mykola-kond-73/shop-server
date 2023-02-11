import express from 'express'
import {getOredres,postOrders} from './routers'
import {getByHashOrders,putByHashOrders,deleteByHashOredrs} from './hash/index'
import {limiter} from '../../utils/middleware/limiter'
import {validator} from '../../utils/middleware/validator'
import {error} from '../../utils/middleware/error'
import {authenticate} from '../../utils/middleware/authenticate'
import {createOrders} from '../../schemas/createOrders'

const router=express.Router()

router.get('/',[limiter(5,60*1000),authenticate,error],getOredres)
router.post('/',[limiter(5,60*1000),authenticate,validator(createOrders),error],postOrders)

router.get('/:hash',[limiter(5,60*1000),authenticate,error],getByHashOrders)
router.put('/:hash',[limiter(5,60*1000),authenticate,validator(createOrders),error],putByHashOrders)
router.delete('/:hash',[limiter(5,60*1000),error],authenticate,deleteByHashOredrs)

export default router