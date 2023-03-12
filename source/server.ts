import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import session, { SessionData } from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import fileUpload from 'express-fileupload'
import auth from './routers/auth'
import customers from './routers/customers'
import orders from './routers/orders'
import products from './routers/products'
import staff from './routers/staffs'
import { Responce } from './utils/responceObject'
import { sessionOptions } from './utils/options/session'
import { corsOptions } from './utils/options/cors'
import { helmetOptions } from './utils/options/helmet'
import { queryLogger, errorLogger } from './utils/loger'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './utils/options/swagger'
import swaggerDocument  from '../swagger.json'
import { errorMiddleware } from './middlewares/error'

const app = express()

// app.set('trust proxy',1)   
// app.use(express.json())                                          //* Парсить JSON
app.use(express.static(path.resolve(__dirname, '../uploads')))        //* Так сервер зможе віддавати статичні файли
app.use(session(sessionOptions))
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '10kb' }))
app.use(fileUpload({}))
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === 'production') {
    console.log(process.env.NODE_ENV)
    app.use('*', (req, res, next) => {
        queryLogger.log('info', `${req.protocol} ${req.method} ${req.originalUrl} ${req.sessionID} ${req.ip}`)
        next()
    })
}

app.use('/auth', auth)
app.use('/staff', staff)
app.use('/customers', customers)
app.use('/products', products)
app.use('/orders', orders)

app.use('*',(req,res,next)=>{
    try{
        res.status(405).json(new Responce(405,'no your endpoints'))
    }catch(error){
        next(error)
    }
})

app.use(errorMiddleware)

export default app