import { Types } from 'mongoose'
import { MetaDataType } from './models/modelsTypes'

export type DBType<T>={
    _id:Types.ObjectId
}&T

export type ResponseWithMetaType<T>={
    data:T
    meta:MetaDataType
}

export type Nullable<T>=T|null