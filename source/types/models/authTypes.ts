import { Types } from 'mongoose'

export type AuthDataType={
    email:string
    password:string   
}

export type AuthCheckUserType=AuthDataType&{_id:Types.ObjectId}