import { Types } from 'mongoose'
import { orders } from '../odm/orders'
import { GetAllCustomersDataItem, GetAllResponseCustomersDataItem } from '../types/models/customersType'
import { GetDataType, HashType } from '../types/models/modelsTypes'
import { GetOrderDataType, OrderFiltersType, OrdersDataType, OrderType, SearchFilterType, UpdateOrderType } from '../types/models/ordersTypes'
import { DBType, ResponseWithMetaType } from '../types/types'
import { _getData } from '../utils/modelUtils'

export class OrdersModel {
    data: OrdersDataType
    constructor(data: OrdersDataType) {
        this.data = data
    }

    async create(): Promise<Types.ObjectId> {
        const data: DBType<OrderType> = await orders.create(this.data as OrderType)
        return data._id
    }

    async getAll(): Promise<ResponseWithMetaType<DBType<GetOrderDataType<GetAllResponseCustomersDataItem>>[]>> {
        const { page, size, filter } = this.data as GetDataType<OrderFiltersType>

        const search: SearchFilterType = {}
        if (filter.orderId && filter.orderId != '' && !filter.clientId) search._id = filter.orderId
        if (filter.clientId && filter.clientId != '' && !filter.orderId) search.customer = filter.clientId

        const offset:number = (page - 1) * size

        const total: number = await orders.countDocuments(search)
        const data: Array<DBType<GetOrderDataType<GetAllCustomersDataItem>>> = await orders
            .find(search)
            .skip(offset)
            .limit(size)
            .populate('products.product', '-description')
            .populate('customer', '-password')
            .lean()

        if (data.length == 0) throw new Error('no orders found')

        const newOrderData: Array<DBType<GetOrderDataType<GetAllResponseCustomersDataItem>>> = []
        for (let j = 0; j < data.length; j++) {
            const newCustomersData = await _getData(data[j].customer)
            newOrderData.push({
                ...data[j],
                customer: newCustomersData
            })
        }

        const responseData: ResponseWithMetaType<DBType<GetOrderDataType<GetAllResponseCustomersDataItem>>[]> = {
            data: newOrderData,
            meta: {
                total,
                page,
                size
            }
        }

        return responseData
    }

    async getByHash(): Promise<DBType<GetOrderDataType<GetAllResponseCustomersDataItem>>> {
        const { hash } = this.data as HashType

        const data: DBType<GetOrderDataType<GetAllCustomersDataItem>> = await orders
            .findById(hash)
            .populate('products.product', '-description')
            .populate('customer', '-password')
            .lean()

        const newCustomersData = await _getData(data.customer)

        const newOrderData: DBType<GetOrderDataType<GetAllResponseCustomersDataItem>> = {
            ...data,
            customer: newCustomersData
        }
        return newOrderData
    }

    async updateByHash(): Promise<Types.ObjectId | boolean> {
        const { hash, payload } = this.data as UpdateOrderType

        if (hash && payload) {
            const data: DBType<OrderType> | null = await orders.findByIdAndUpdate(hash, payload, { returnDocument: 'after' })
            return data!._id
        }
        return false
    }

    async removeByHash(): Promise<DBType<OrderType>> {
        const { hash } = this.data as HashType
        const data: DBType<OrderType> | null = await orders.findByIdAndDelete({ _id: hash })
        return data!
    }
}