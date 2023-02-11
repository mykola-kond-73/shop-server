export type RoleStaffType = 'ceo' | 'testing' | 'frontend' | 'backend' | 'fullstack' | 'manager'
export type SectionsType= 'IPhone'|'Mac'|'IPad'|'Apple Watch'|'AirPods'|'Accessories'|'Covers & Bags'

export type NameObjType = {
    firstname: string
    lastName: string
}

export type GetDataType<F> = {
    page: number
    size: number
    filter: F
}

export type MetaDataType = {
    total: number
    page: number
    size: number
}

export type HashType={
    hash:string
}

export type CheckCreateCustomerOrStaffSameType={
    email:string
    phone:string
}

export type UpdateConstructorType<T>={payload:T}&HashType