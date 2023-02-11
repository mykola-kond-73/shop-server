import {  GetAllResponseCustomersDataItem } from './customersType';
import { Types } from 'mongoose'
import { GetDataType, HashType, UpdateConstructorType } from './modelsTypes'
import { ProductType } from './productsTypes';
import { DBType } from '../types';

export type OrderProductItemType={
    product:Types.ObjectId
    count:number
}

export type OrderType={
    customer:Types.ObjectId
    products:Array<OrderProductItemType>
    comment:string
}

export type GetOrderDataType<T>={
    customer:DBType<T>
    products:Array<DBType<Omit<ProductType,'description'>>>
    comment:string
}

export type SearchFilterType=Partial<Record<'_id'|'customer',string>>
export type OrderFiltersType = Partial<Record<'orderId' | 'clientId', string>>
export type UpdateOrderType=UpdateConstructorType<OrderType>

export type OrdersDataType=OrderType | HashType | GetDataType<OrderFiltersType> | UpdateOrderType