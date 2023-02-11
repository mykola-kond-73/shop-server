import express from 'express'
import {postCustomers,getCustomers} from './routers'
import {deleteByHashCustomers,getByHashCustomers,putByHashCustomers} from './hash/index'
import {limiter} from '../../utils/middleware/limiter'
import {validator} from'../../utils/middleware/validator'
import {error} from '../../utils/middleware/error'
import {authenticate} from'../../utils/middleware/authenticate'
import {createCustomers,codeCreateCustomers,updateCustomers,codeUpdateCustomers} from '../../schemas/createCustomers'
import {decode} from '../../utils/middleware/decode'

const router=express.Router()

router.get('/',[limiter(5,60*1000),authenticate,error],getCustomers)
router.post('/',[limiter(5,60*1000),validator(codeCreateCustomers),decode,validator(createCustomers),error],postCustomers) 

router.get('/:hash',[limiter(5,60*1000),authenticate,error],getByHashCustomers)
router.put('/:hash',[limiter(5,60*1000),authenticate,validator(codeUpdateCustomers),decode,validator(updateCustomers),error],putByHashCustomers)
router.delete('/:hash',[limiter(5,60*1000),authenticate,error],deleteByHashCustomers)

export default router