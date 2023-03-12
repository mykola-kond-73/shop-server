import express from 'express'
import {limiter} from '../middlewares/limiter'
import { authController } from '../controllers/auth'

const router=express.Router()

// router.post('/login',[limiter(5,60*1000)],authController.authLogin)
// router.post('/loginCust',[limiter(5,60*1000)],authController.authLoginCust)
// router.delete('/unlogin',[limiter(5,60*1000)],authController.unlogin)

router.post('/login',[limiter(5,60*1000)],authController.loginStaff)
router.post('/loginCust',[limiter(5,60*1000)],authController.loginCustomer)
router.delete('/logout',[limiter(5,60*1000)],authController.logout)
router.get('/refresh',[limiter(5,60*1000)],authController.refresh)

export default router