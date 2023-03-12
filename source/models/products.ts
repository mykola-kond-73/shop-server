import mongoose from 'mongoose'
import { AvatarType, ProductType, ShareType } from '../types/models/productsTypes'

const childSchemaParams={
    versionKey:false,
    autoIndex:false,
    _id:false  
}

const avatarSchema=new mongoose.Schema<AvatarType>({
    small:{
        type:String,
        require:true
    },
    large:{
        type:String,
        require:true
    }
},childSchemaParams)

const shareSchema=new mongoose.Schema<ShareType>({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    } 
},childSchemaParams)

const schema=new mongoose.Schema<ProductType>({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    } ,
    total:{
        type:Number,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    isTop:{
        type:Boolean,
        required:true
    },
    photos:{
        type:[String],
        required:true
    },
    avatar:{
        type:avatarSchema,
        required:true
    },
    share:{
        type:shareSchema
    }
},{
    versionKey:false,
    autoIndex:false
})

const productsModel=mongoose.model('products',schema)

export{productsModel}

productsModel.createIndexes()