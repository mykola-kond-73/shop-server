import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import session, { SessionData } from 'express-session'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import fileUpload from 'express-fileupload'
import auth from './routers/auth/index'
import customers from './routers/customers/inedx'
import orders from './routers/oredres/index'
import products from './routers/products/index'
import staff from './routers/staff/index'
import { Responce } from './utils/responceObject'
import { sessionOptions } from './utils/options/session'
import { corsOptions } from './utils/options/cors'
import { helmetOptions } from './utils/options/helmet'
import { queryLogger, errorLogger } from './utils/loger'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './utils/options/swagger'
import swaggerDocument  from '../swagger.json'

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

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

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

// app.use('*',(req,res,next)=>{
//     try{
//         console.log(req)
//         res.status(405).json(new Responce(405,'no your endpoints'))
//     }catch(error){
//         next(error)
//     }
// })

app.use((error: any, req: Request, res: Response, next: NextFunction) => {

    errorLogger.error(`status:500 ${error.message}`)
    res.status(500).json(new Responce(500, 'Sory server error'))
})

export default app