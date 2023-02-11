import { GetDataType, HashType, NameObjType, RoleStaffType, UpdateConstructorType } from './modelsTypes'

export type StaffType = {
    name: string
    email: string
    phone: string
    role: RoleStaffType
    password: string
    isAdmin: boolean
}

export type StaffFilterType =Partial<{
    staffId:string
    isAdmin:boolean
    name:string
    role:string,
    phone:string
    email:string
}>

export type GetAllStaffsDataItem=Omit<StaffType,'password'>
export type GetAllResponseStaffsDataItem=Omit<GetAllStaffsDataItem,'name'>&{name:NameObjType}
export type UpdateStaffType=UpdateConstructorType<GetAllStaffsDataItem>

export type StaffDataType=StaffType|GetDataType<StaffFilterType> | HashType |UpdateStaffType