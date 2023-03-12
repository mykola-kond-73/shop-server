import express from 'express'
import {limiter} from'../middlewares/limiter'
import {validator} from'../middlewares/validator'
import {authenticate} from'../middlewares/authenticate'
import {createProducts} from'../schemas/createProducts'
import { productsController } from '../controllers/products'

const router=express.Router()

router.get('/',[limiter(100,60*1000)],productsController.getProducts)
router.post('/',[limiter(5,60*1000),authenticate,validator(createProducts)],productsController.postProducts)      

router.get('/:hash',[limiter(5,60*1000)],productsController.getByHashProducts)
router.put('/:hash',[limiter(5,60*1000),authenticate,validator(createProducts)],productsController.putByHAshProducts)
router.delete('/:hash',[limiter(5,60*1000),authenticate],productsController.deleteByHashProducts)

export default router