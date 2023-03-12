import { Types } from 'mongoose'
import { ApiError } from '../exceptions/exceptions'
import { staffModel } from '../models/staff'
import { CheckCreateCustomerOrStaffSameType, GetDataType, HashType} from '../types/models/modelsTypes'
import { GetAllStaffsDataItem, GetAllResponseStaffsDataItem, StaffDataType, StaffFilterType, StaffType, UpdateStaffType } from '../types/models/staffTypes'
import { DBType, ResponseWithMetaType } from '../types/types'
import { _runningData, _tranformCreateUser, _getData } from '../utils/modelUtils'

class StaffService {

    async create(payload:StaffDataType): Promise<Types.ObjectId> {
        const dataofDb: Array<CheckCreateCustomerOrStaffSameType> = await staffModel.find({}).select('email phone -_id').lean()
        if (dataofDb && payload) await _runningData(dataofDb, payload as StaffType)

        const userData: StaffType = await _tranformCreateUser(payload)
        const staffData: DBType<StaffType> = await staffModel.create(userData)
        return staffData._id
    }

    async getAll(payload:StaffDataType): Promise<ResponseWithMetaType<DBType<GetAllResponseStaffsDataItem>[]>> {
        const { page, size, filter } = payload as GetDataType<StaffFilterType>

        const search: Omit<StaffFilterType, 'staffId'> & { _id?: string } = {}
        if (filter.staffId && filter.staffId != '') search._id = filter.staffId
        if (filter.isAdmin === true || filter.isAdmin === false) search.isAdmin = filter.isAdmin
        if (filter.name && filter.name != '') search.name = filter.name
        if (filter.role && filter.role != '') search.role = filter.role
        if (filter.phone && filter.phone != '') search.phone = filter.phone
        if (filter.email && filter.email != '') search.email = filter.email

        const offset = (page - 1) * size

        const total: number = await staffModel.countDocuments(search)
        const data: Array<DBType<GetAllStaffsDataItem>> = await staffModel.find(search)
            .skip(offset)
            .limit(Number(size))
            .select('-password')
            .sort({ name: 1 })
            .lean()

        if (data.length == 0) throw ApiError.BadRequest('no staff found')

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

    async getByHash(payload:StaffDataType): Promise<DBType<GetAllResponseStaffsDataItem>> {
        const { hash } = payload as HashType
        const data: DBType<GetAllStaffsDataItem> = await staffModel.findById(hash).select('-password').lean()

        const newStaffData: DBType<GetAllResponseStaffsDataItem> = await _getData(data)
        return newStaffData
    }

    async updateByHash(payloadUpdate:StaffDataType): Promise<Types.ObjectId | boolean> {
        const { hash, payload } = payloadUpdate as UpdateStaffType
        const dataofDb: Array<CheckCreateCustomerOrStaffSameType> = await staffModel.find({}).select('email phone -_id').lean()
        const newDataofDb: Array<CheckCreateCustomerOrStaffSameType> = dataofDb.filter(elem => elem.email != payload.email && elem.phone != payload.phone)

        if (newDataofDb && hash && payload) {
            await _runningData(newDataofDb, payload)
            const data: DBType<StaffType> | null = await staffModel.findByIdAndUpdate(hash, payload)
            return data!._id
        }
        return false
    }

    async deleteByHash(payload:StaffDataType): Promise<DBType<StaffType>> {
        const { hash } = payload as HashType
        const data: DBType<StaffType> | null = await staffModel.findOneAndDelete({ _id: hash })
        return data!
    }
}

export const staffService = new StaffService()