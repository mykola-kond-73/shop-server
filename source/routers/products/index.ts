import express from 'express'
import {getProducts,postProducts} from './routers'
import {getByHashProducts,putByHAshProducts,deleteByHashProducts} from './hash/index'
import {limiter} from'../../utils/middleware/limiter'
import {validator} from'../../utils/middleware/validator'
import {error} from'../../utils/middleware/error'
import {authenticate} from'../../utils/middleware/authenticate'
import {createProducts} from'../../schemas/createProducts'

const router=express.Router()

router.get('/',[limiter(100,60*1000),error],getProducts)
router.post('/',[limiter(5,60*1000),authenticate,validator(createProducts),error],postProducts)      

router.get('/:hash',[limiter(5,60*1000),error],getByHashProducts)
router.put('/:hash',[limiter(5,60*1000),authenticate,validator(createProducts),error],putByHAshProducts)
router.delete('/:hash',[limiter(5,60*1000),authenticate,error],deleteByHashProducts)

export default router