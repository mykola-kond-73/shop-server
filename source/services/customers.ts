import { Types } from 'mongoose'
import { ApiError } from '../exceptions/exceptions'
import { customersModel } from '../models/customers'
import { CustomerFilterType, CustomersDataType, CustomerType, GetAllCustomersDataItem, GetAllResponseCustomersDataItem, UpdateCustomerType } from '../types/models/customersType'
import { CheckCreateCustomerOrStaffSameType, GetDataType, HashType } from '../types/models/modelsTypes'
import { DBType, ResponseWithMetaType } from '../types/types'
import { _runningData, _getData, _tranformCreateUser } from '../utils/modelUtils'

class CustomersService {

    async create(payload:CustomersDataType): Promise<Types.ObjectId> {
        const dataofDb: Array<CheckCreateCustomerOrStaffSameType> = await customersModel.find({}).select('email phone -_id').lean()

        if (dataofDb && payload) await _runningData(dataofDb, payload as CustomerType)

        const userData: CustomerType = await _tranformCreateUser(payload)
        const hash: DBType<CustomerType> = await customersModel.create(userData)

        return hash._id
    }

    async getAll(payload:CustomersDataType): Promise<ResponseWithMetaType<DBType<GetAllResponseCustomersDataItem>[]>> {
        const { page, size, filter } = payload as GetDataType<CustomerFilterType>

        const search: Omit<CustomerFilterType, 'customerId'> & { _id?: string } = {}
        if (filter.customerId && filter.customerId != '') search._id = filter.customerId
        if (filter.name && filter.name != '') search.name = filter.name
        if (filter.country && filter.country != '') search.country = filter.country
        if (filter.city && filter.city != '') search.city = filter.city
        if (filter.phone && filter.phone != '') search.phone = filter.phone
        if (filter.email && filter.email != '') search.email = filter.email

        const offset = (page - 1) * size

        const total: number = await customersModel.countDocuments(search)
        const data: Array<DBType<GetAllCustomersDataItem>> = await customersModel.find(search)
            .skip(offset)
            .limit(Number(size))
            .select('-password')
            .sort({ name: 1 })
            .lean()
        if (data.length == 0) throw ApiError.BadRequest('no clients found')

        const newCustomersData: Array<DBType<GetAllResponseCustomersDataItem>> = await _getData(data, true)

        const responseData: ResponseWithMetaType<DBType<GetAllResponseCustomersDataItem>[]> = {
            data: newCustomersData,
            meta: {
                total,
                page,
                size
            }
        }

        return responseData
    }

    async getByHash(payload:CustomersDataType): Promise<DBType<GetAllResponseCustomersDataItem>> {
        const { hash } = payload as HashType
        const data: DBType<GetAllCustomersDataItem> = await customersModel.findById(hash).select('-password').lean()

        const newCustomersData: DBType<GetAllResponseCustomersDataItem> = await _getData(data)
        return newCustomersData
    }

    async updateByHash(payloadUpdate:CustomersDataType): Promise<Types.ObjectId | boolean> {
        const { hash, payload } = payloadUpdate as UpdateCustomerType
        const dataofDb: Array<CheckCreateCustomerOrStaffSameType> = await customersModel.find({}).select('email phone -_id').lean()
        const newDataofDb: Array<CheckCreateCustomerOrStaffSameType> = dataofDb.filter(elem => elem.email != payload.email && elem.phone != payload.phone)
        if (newDataofDb && hash && payload) {
            await _runningData(newDataofDb, payload)
            const data: DBType<CustomerType> | null = await customersModel.findByIdAndUpdate(hash, payload)
            return data!._id
        }
        return false
    }

    async deleteByHash(payload:CustomersDataType): Promise<DBType<CustomerType>> {
        const { hash } = payload as HashType
        const data: DBType<CustomerType> | null = await customersModel.findByIdAndDelete({ _id: hash })
        return data!
    }
}

export const customerService = new CustomersService()