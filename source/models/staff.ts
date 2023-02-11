import { Types } from 'mongoose'
import { staff } from '../odm/staff'
import { CheckCreateCustomerOrStaffSameType, GetDataType, HashType } from '../types/models/modelsTypes'
import { GetAllStaffsDataItem, GetAllResponseStaffsDataItem, StaffDataType, StaffFilterType, StaffType, UpdateStaffType } from '../types/models/staffTypes'
import { DBType, ResponseWithMetaType } from '../types/types'
import { _runningData, _tranformCreateUser, _getData } from '../utils/modelUtils'

export class StaffModel {
    data: StaffDataType

    constructor(data: StaffDataType) {
        this.data = data
    }

    async create(): Promise<Types.ObjectId> {
        const dataofDb: Array<CheckCreateCustomerOrStaffSameType> = await staff.find({}).select('email phone -_id').lean()
        if (dataofDb && this.data) await _runningData(dataofDb, this.data as StaffType)

        const userData: StaffType = await _tranformCreateUser(this.data)
        const staffData: DBType<StaffType> = await staff.create(userData)
        return staffData._id
    }

    async getAll(): Promise<ResponseWithMetaType<DBType<GetAllResponseStaffsDataItem>[]>> {
        const { page, size, filter } = this.data as GetDataType<StaffFilterType>

        const search: Omit<StaffFilterType, 'staffId'> & { _id?: string } = {}
        if (filter.staffId && filter.staffId != '') search._id = filter.staffId
        if (filter.isAdmin === true || filter.isAdmin === false) search.isAdmin = filter.isAdmin
        if (filter.name && filter.name != '') search.name = filter.name
        if (filter.role && filter.role != '') search.role = filter.role
        if (filter.phone && filter.phone != '') search.phone = filter.phone
        if (filter.email && filter.email != '') search.email = filter.email

        const offset = (page - 1) * size

        const total: number = await staff.countDocuments(search)
        const data: Array<DBType<GetAllStaffsDataItem>> = await staff.find(search)
            .skip(offset)
            .limit(Number(size))
            .select('-password')
            .sort({ name: 1 })
            .lean()

        if (data.length == 0) throw new Error('no staff found')

        const newStaffData: Array<DBType<GetAllResponseStaffsDataItem>> = await _getData(data, true)

        const responseData: ResponseWithMetaType<DBType<GetAllResponseStaffsDataItem>[]> = {
            data: newStaffData,
            meta: {
                total,
                page,
                size
            }
        }

        return responseData
    }

    async getByHash(): Promise<DBType<GetAllResponseStaffsDataItem>> {
        const { hash } = this.data as HashType
        const data: DBType<GetAllStaffsDataItem> = await staff.findById(hash).select('-password').lean()

        const newStaffData: DBType<GetAllResponseStaffsDataItem> = await _getData(data)
        return newStaffData
    }

    async updateByHash(): Promise<Types.ObjectId | boolean> {
        const { hash, payload } = this.data as UpdateStaffType
        const dataofDb: Array<CheckCreateCustomerOrStaffSameType> = await staff.find({}).select('email phone -_id').lean()
        const newDataofDb: Array<CheckCreateCustomerOrStaffSameType> = dataofDb.filter(elem => elem.email != payload.email && elem.phone != payload.phone)

        if (newDataofDb && hash && payload) {
            await _runningData(newDataofDb, payload)
            const data: DBType<StaffType> | null = await staff.findByIdAndUpdate(hash, payload)
            return data!._id
        }
        return false
    }

    async deleteByHash(): Promise<DBType<StaffType>> {
        const { hash } = this.data as HashType
        const data: DBType<StaffType> | null = await staff.findOneAndDelete({ _id: hash })
        return data!
    }
}