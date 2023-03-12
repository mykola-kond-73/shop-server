import express from 'express'
import {createStaff,codeCreateStaff,updateStaff,codeUpdateStaff} from '../schemas/createStaff'
import {limiter} from '../middlewares/limiter'
import {validator} from '../middlewares/validator'
import {authenticate} from '../middlewares/authenticate'
import {ChechSecretKeyToCreateAdmin} from '../middlewares/ChechSecretKeyToCreateAdmin'
import {decode} from '../middlewares/decode'
import { staffsController } from '../controllers/staffs'

const router=express.Router()

router.get('/',[limiter(5,60*1000),authenticate],staffsController.getStaff)
router.post('/',[limiter(5,60*1000),authenticate,validator(codeCreateStaff),decode,ChechSecretKeyToCreateAdmin,validator(createStaff)],staffsController.postStaff) 

router.get('/:hash',[limiter(5,60*1000),authenticate],staffsController.getByHashStaff)
router.put('/:hash',[limiter(5,60*1000),authenticate,validator(codeUpdateStaff),decode,validator(updateStaff)],staffsController.putByHAshStaff)
router.delete('/:hash',[limiter(5,60*1000),authenticate],staffsController.deleteByHashStaff)

export default router