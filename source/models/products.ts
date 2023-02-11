import { Types } from 'mongoose';
import { products } from '../odm/products'
import { HashType, SectionsType } from '../types/models/modelsTypes';
import { GetDataTypeProducts, ProductsDataType, productsFilterType, ProductType, UpdateProductType } from '../types/models/productsTypes'
import { DBType, ResponseWithMetaType } from '../types/types'

export class ProductsModel {
    data: ProductsDataType

    constructor(data: ProductsDataType) {
        this.data = data
    }

    async create(): Promise<Types.ObjectId> {
        const hash: DBType<ProductType> = await products.create(this.data as ProductType)
        return hash._id
    }

    async getAll(): Promise<ResponseWithMetaType<DBType<ProductType>[]>> {
        const { page, size, section, filter } = this.data as GetDataTypeProducts

        const offset = (page - 1) * size

        const search: Omit<productsFilterType, 'textId'> & { section?: SectionsType | 'null', _id?: string } = {}
        let keyWord = {}
        let isShare = {}
        let price = {}

        if (filter.isTop === true || filter.isTop === false) search.isTop = filter.isTop
        if (filter.price) price = { price: { $gte: filter.price[0], $lte: filter.price[1] } }
        if (section != 'null') search.section = section
        if (filter.keyWord && filter.keyWord != '') keyWord = { title: { $regex: filter.keyWord, $options: 'im' } }
        if (filter.textId && filter.textId != '') search._id = filter.textId
        if (filter.isShare === true) isShare = { share: { $type: 'object' } }
        else if (filter.isShare === false) isShare = { share: { $type: 'null' } }

        const searchObj = { $and: [price, isShare, keyWord, search] }
        const total: number = await products.countDocuments(searchObj)
        const data: Array<DBType<ProductType>> = await products.find(searchObj)
            .skip(offset)
            .limit(Number(size))
            .sort({ title: 1 })
            .lean()
        if (data.length == 0) throw new Error('no products found')

        const responseData: ResponseWithMetaType<DBType<ProductType>[]> = {
            data,
            meta: {
                total,
                page: page,
                size: size
            }
        }

        return responseData
    }

    async getByHash(): Promise<DBType<ProductType>> {
        const { hash } = this.data as HashType
        const data: DBType<ProductType> = await products.findById(hash).lean()
        return data
    }

    async updateByHash(): Promise<Types.ObjectId | boolean> {
        const { hash, payload } = this.data as UpdateProductType
        if (hash && payload) {
            const data: DBType<ProductType> | null = await products.findByIdAndUpdate(hash, payload)
            return data!._id
        }
        return false
    }

    async removeByHash(): Promise<DBType<ProductType>> {
        const { hash } = this.data as HashType
        const data: DBType<ProductType> | null = await products.findByIdAndDelete(hash)
        return data!
    }
}