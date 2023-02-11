import express from 'express'
import {getStaff,postStaff} from './routers'
import {getByHashStaff,putByHAshStaff,deleteByHashStaff} from './hash/index'
import {createStaff,codeCreateStaff,updateStaff,codeUpdateStaff} from '../../schemas/createStaff'
import {limiter} from '../../utils/middleware/limiter'
import {validator} from '../../utils/middleware/validator'
import {error} from '../../utils/middleware/error'
import {authenticate} from '../../utils/middleware/authenticate'
import {ChechSecretKeyToCreateAdmin} from '../../utils/middleware/ChechSecretKeyToCreateAdmin'
import {decode} from '../../utils/middleware/decode'

const router=express.Router()

router.get('/',[limiter(5,60*1000),authenticate,error],getStaff)
router.post('/',[limiter(5,60*1000),authenticate,validator(codeCreateStaff),decode,ChechSecretKeyToCreateAdmin,validator(createStaff),error],postStaff) 

router.get('/:hash',[limiter(5,60*1000),authenticate,error],getByHashStaff)
router.put('/:hash',[limiter(5,60*1000),authenticate,validator(codeUpdateStaff),decode,validator(updateStaff),error],putByHAshStaff)
router.delete('/:hash',[limiter(5,60*1000),authenticate,error],deleteByHashStaff)

export default router