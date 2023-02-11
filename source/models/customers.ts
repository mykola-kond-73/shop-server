import { Types } from 'mongoose'
import { customers } from '../odm/customers'
import { CustomerFilterType, CustomersDataType, CustomerType, GetAllCustomersDataItem, GetAllResponseCustomersDataItem, UpdateCustomerType } from '../types/models/customersType'
import { CheckCreateCustomerOrStaffSameType, GetDataType, HashType } from '../types/models/modelsTypes'
import { DBType, ResponseWithMetaType } from '../types/types'
import { _runningData, _getData, _tranformCreateUser } from '../utils/modelUtils'

export class CustomersModel {
    data: CustomersDataType

    constructor(data: CustomersDataType) {
        this.data = data
    }

    async create(): Promise<Types.ObjectId> {
        const dataofDb: Array<CheckCreateCustomerOrStaffSameType> = await customers.find({}).select('email phone -_id').lean()

        if (dataofDb && this.data) await _runningData(dataofDb, this.data as CustomerType)

        const userData: CustomerType = await _tranformCreateUser(this.data)
        const hash: DBType<CustomerType> = await customers.create(userData)

        return hash._id
    }

    async getAll(): Promise<ResponseWithMetaType<DBType<GetAllResponseCustomersDataItem>[]>> {
        const { page, size, filter } = this.data as GetDataType<CustomerFilterType>

        const search: Omit<CustomerFilterType, 'customerId'> & { _id?: string } = {}
        if (filter.customerId && filter.customerId != '') search._id = filter.customerId
        if (filter.name && filter.name != '') search.name = filter.name
        if (filter.country && filter.country != '') search.country = filter.country
        if (filter.city && filter.city != '') search.city = filter.city
        if (filter.phone && filter.phone != '') search.phone = filter.phone
        if (filter.email && filter.email != '') search.email = filter.email

        const offset = (page - 1) * size

        const total: number = await customers.countDocuments(search)
        const data: Array<DBType<GetAllCustomersDataItem>> = await customers.find(search)
            .skip(offset)
            .limit(Number(size))
            .select('-password')
            .sort({ name: 1 })
            .lean()
        if (data.length == 0) throw new Error('no clients found')

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

    async getByHash(): Promise<DBType<GetAllResponseCustomersDataItem>> {
        const { hash } = this.data as HashType
        const data: DBType<GetAllCustomersDataItem> = await customers.findById(hash).select('-password').lean()

        const newCustomersData: DBType<GetAllResponseCustomersDataItem> = await _getData(data)
        return newCustomersData
    }

    async updateByHash(): Promise<Types.ObjectId | boolean> {
        const { hash, payload } = this.data as UpdateCustomerType
        const dataofDb: Array<CheckCreateCustomerOrStaffSameType> = await customers.find({}).select('email phone -_id').lean()
        const newDataofDb: Array<CheckCreateCustomerOrStaffSameType> = dataofDb.filter(elem => elem.email != payload.email && elem.phone != payload.phone)
        if (newDataofDb && hash && payload) {
            await _runningData(newDataofDb, payload)
            const data: DBType<CustomerType> | null = await customers.findByIdAndUpdate(hash, payload)
            return data!._id
        }
        return false
    }

    async deleteByHash(): Promise<DBType<CustomerType>> {
        const { hash } = this.data as HashType
        const data: DBType<CustomerType> | null = await customers.findByIdAndDelete({ _id: hash })
        return data!
    }
}