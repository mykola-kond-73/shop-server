import { GetDataType, HashType, NameObjType, UpdateConstructorType } from './modelsTypes'

export type CustomerType = {
    name: string
    country: string
    city: string
    email: string
    phone: string
    password: string
}

export type CustomerFilterType = Partial<Record<'customerId' | 'name' | 'country' | 'city' | 'phone' | 'email', string>>
export type GetAllCustomersDataItem=Omit<CustomerType,'password'>
export type GetAllResponseCustomersDataItem=Omit<GetAllCustomersDataItem,'name'>&{name:NameObjType}
export type UpdateCustomerType=UpdateConstructorType<GetAllCustomersDataItem>

export type CustomersDataType = CustomerType | GetDataType<CustomerFilterType> | HashType |UpdateCustomerType