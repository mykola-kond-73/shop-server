import mongoose from 'mongoose'
import { CustomerType } from '../types/models/customersType'

const schema = new mongoose.Schema<CustomerType>({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    phone: {
        type: String,
        unique: true,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},{
    versionKey:false,
    autoIndex:false
})

schema.index({password:1},{unique:true})
schema.index({email:1},{unique:true})

const customers = mongoose.model('customers', schema)

export {customers}

customers.createIndexes()