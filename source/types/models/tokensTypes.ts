import { Types } from 'mongoose'

export type TokenDataType={
    email:string
    id:Types.ObjectId
}

export type ReturnTokenType={
    accessToken:string
    refreshToken:string
}