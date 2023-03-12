import mongoose from 'mongoose'
import { OrderProductItemType, OrderType } from '../types/models/ordersTypes'

const productSchema=new mongoose.Schema<OrderProductItemType>({
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'products',
        require: true
        // unique: true
    },
    count: {
        type: Number,
        require: true
    }
},{_id:false})

const schema = new mongoose.Schema<OrderType>({
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'customers',
        require: true
    },
    products: [productSchema],
    comment: {
        type: String,
        require: true
    }
}, {
    versionKey: false,
    autoIndex: false
})

const ordersModel = mongoose.model('orders', schema)

export{ordersModel}

ordersModel.createIndexes()