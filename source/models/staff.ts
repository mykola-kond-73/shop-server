import mongoose from 'mongoose'
import { StaffType } from '../types/models/staffTypes'

const schema=new mongoose.Schema<StaffType>({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    } ,
    phone:{
        type:String,
        require:true,
        unique:true
    },
    role:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        require:true
    },
    password:{
        type:String,
        require:true
    }
},{
    versionKey:false,
    autoIndex:false
})

schema.index({password:1},{unique:true})
schema.index({email:1},{unique:true})
// schema.index({email:1})

const staffModel=mongoose.model('staff',schema)

export{staffModel}

staffModel.createIndexes()