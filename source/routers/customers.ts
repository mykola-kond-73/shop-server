import express from 'express'
import {limiter} from '../middlewares/limiter'
import {validator} from'../middlewares/validator'
import {authenticate} from'../middlewares/authenticate'
import {createCustomers,codeCreateCustomers,updateCustomers,codeUpdateCustomers} from '../schemas/createCustomers'
import {decode} from '../middlewares/decode'
import { customersController } from '../controllers/customers'

const router=express.Router()

router.get('/',[limiter(5,60*1000),authenticate],customersController.getCustomers)
router.post('/',[limiter(5,60*1000),validator(codeCreateCustomers),decode,validator(createCustomers)],customersController.postCustomers) 

router.get('/:hash',[limiter(5,60*1000),authenticate],customersController.getByHashCustomers)
router.put('/:hash',[limiter(5,60*1000),authenticate,validator(codeUpdateCustomers),decode,validator(updateCustomers)],customersController.putByHashCustomers)
router.delete('/:hash',[limiter(5,60*1000),authenticate],customersController.deleteByHashCustomers)

export default router