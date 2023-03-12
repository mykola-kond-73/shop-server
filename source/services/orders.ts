import { Types } from 'mongoose'
import { ApiError } from '../exceptions/exceptions'
import { ordersModel } from '../models/orders'
import { GetAllCustomersDataItem, GetAllResponseCustomersDataItem } from '../types/models/customersType'
import { GetDataType, HashType } from '../types/models/modelsTypes'
import { GetOrderDataType, OrderFiltersType, OrdersDataType, OrderType, SearchFilterType, UpdateOrderType } from '../types/models/ordersTypes'
import { DBType, ResponseWithMetaType } from '../types/types'
import { _getData } from '../utils/modelUtils'

class OrdersService {

    async create(payload:OrdersDataType): Promise<Types.ObjectId> {
        const data: DBType<OrderType> = await ordersModel.create(payload as OrderType)
        return data._id
    }

    async getAll(payload:OrdersDataType): Promise<ResponseWithMetaType<DBType<GetOrderDataType<GetAllResponseCustomersDataItem>>[]>> {
        const { page, size, filter } = payload as GetDataType<OrderFiltersType>

        const search: SearchFilterType = {}
        if (filter.orderId && filter.orderId != '' && !filter.clientId) search._id = filter.orderId
        if (filter.clientId && filter.clientId != '' && !filter.orderId) search.customer = filter.clientId

        const offset:number = (page - 1) * size

        const total: number = await ordersModel.countDocuments(search)
        const data: Array<DBType<GetOrderDataType<GetAllCustomersDataItem>>> = await ordersModel
            .find(search)
            .skip(offset)
            .limit(size)
            .populate('products.product', '-description')
            .populate('customer', '-password')
            .lean()

        if (data.length == 0) throw ApiError.BadRequest('no orders found')

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

    async getByHash(payload:OrdersDataType): Promise<DBType<GetOrderDataType<GetAllResponseCustomersDataItem>>> {
        const { hash } = payload as HashType

        const data: DBType<GetOrderDataType<GetAllCustomersDataItem>> = await ordersModel
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

    async updateByHash(payloadUpdate:OrdersDataType): Promise<Types.ObjectId | boolean> {
        const { hash, payload } = payloadUpdate as UpdateOrderType

        if (hash && payloadUpdate) {
            const data: DBType<OrderType> | null = await ordersModel.findByIdAndUpdate(hash, payload, { returnDocument: 'after' })
            return data!._id
        }
        return false
    }

    async removeByHash(payload:OrdersDataType): Promise<DBType<OrderType>> {
        const { hash } = payload as HashType
        const data: DBType<OrderType> | null = await ordersModel.findByIdAndDelete({ _id: hash })
        return data!
    }
}

export const ordersService=new OrdersService()