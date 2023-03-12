import bcrypt from 'bcrypt'
import { ApiError } from '../exceptions/exceptions'
import {_encode} from './crypto/encode'

const _runningData=async(dataOfDb:Array<any>,newData:any)=>{
    for(let j=0;j<dataOfDb.length;j++){
        await _uniquenessСheck(dataOfDb[j].email,newData.email)
        await _uniquenessСheck(dataOfDb[j].phone,newData.phone)
    }
}

const _uniquenessСheck=async(dbData:string,newData:string)=>{
    if(dbData==newData) throw ApiError.BadRequest('user with this email or phone number already exists')      
}

const _transformGetUser=async(fullname:string)=>{
    const nameArr = fullname.split(' ')
    
    const newName = {
        firstname:nameArr[0],
        lastName:nameArr[1]
    }
    return newName
}

const _tranformCreateUser=async(data:any)=>{
    const {password}=data
    const hashedPassword=await bcrypt.hash(password,11)
    const newData:any={
        ...data,
        password:hashedPassword
    }
    return newData
}

const _getData=async(data:Array<any>|any,isMany=false)=>{
    let newData:Array<any>|any
    if(isMany){
        newData=[]
        for (let i = 0; i < data.length; i++) {
            newData.push({
                ...data[i],
                name:await _transformGetUser(data[i].name),
                email:await _encode(data[i].email),
                phone:await _encode(data[i].phone)
            })
        }
    }
    else if(!isMany){
        newData={
            ...data,
            name:await _transformGetUser(data.name),
            phone:await _encode(data.phone),
            email:await _encode(data.email)
        }
    }
    return newData
}

export{
    _runningData,
    _transformGetUser,
    _tranformCreateUser,
    _getData
}