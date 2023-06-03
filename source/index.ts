import mongoose from 'mongoose'
import app from './server'
import {mongooseOptions} from './utils/options/mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const PORT=process.env.PORT||8888

mongoose.set("strictQuery", true)
const connection = mongoose.connect(`mongodb+srv://${process.env.DB_PASS}@${process.env.DB_USER}.mongodb.net/${process.env.DB_DATABASE}`,mongooseOptions)

connection
    .then(() => {
        console.log('\ndb connected')
        
        app.listen(PORT,()=>{
            console.log(`Server started on port ${PORT} ${process.env.NODE_ENV}`)
        })
    })
    .catch(({ message }:{message:any}) => {
        console.log(message)
        console.log('ERROR CONNECTED')
    });