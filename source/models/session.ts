import mongoose from 'mongoose'

const schema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    refreshToken:{
        type:String,
        require:true,
        unique:true
    }
},{
    versionKey: false,
    autoIndex: false
})

export const sessionModel=mongoose.model('session',schema)

sessionModel.createIndexes()