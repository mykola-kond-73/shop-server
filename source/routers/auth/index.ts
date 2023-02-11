import express from 'express'
import {authLogin,authLoginCust,unlogin} from './routers'
import {limiter} from '../../utils/middleware/limiter'
import {error} from '../../utils/middleware/error'

const router=express.Router()

router.post('/login',[limiter(5,60*1000),error],authLogin)
router.post('/loginCust',[limiter(5,60*1000),error],authLoginCust)
router.delete('/unlogin',[limiter(5,60*1000),error],unlogin)

export default router