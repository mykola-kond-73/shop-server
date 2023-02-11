import { Nullable } from '../types'
import { GetDataType, HashType, NameObjType, SectionsType, UpdateConstructorType } from './modelsTypes'

export type ShareType = {
    title: string
    description: string
}

export type AvatarType = {
    small: string
    large: string
}

export type ProductType = {
    photos: Array<string>
    title: string
    description: string
    section:SectionsType
    price: number
    discount: number
    total: number
    isTop: boolean
    share: Nullable<ShareType>
    avatar: AvatarType
}

export type productsFilterType =Partial<{
    textId: string
    keyWord: string
    price: [number, number]
    isShare: boolean
    isTop: boolean
}>
export type GetDataTypeProducts=GetDataType<productsFilterType>&{section:SectionsType|'null'}
export type UpdateProductType=UpdateConstructorType<ProductType>

export type ProductsDataType =ProductType|HashType | GetDataTypeProducts | UpdateProductType