import { Types } from 'mongoose';
import { ApiError } from '../exceptions/exceptions';
import { productsModel } from '../models/products'
import { HashType, SectionsType } from '../types/models/modelsTypes';
import { GetDataTypeProducts, ProductsDataType, productsFilterType, ProductType, UpdateProductType } from '../types/models/productsTypes'
import { DBType, ResponseWithMetaType } from '../types/types'

class ProductsService {

    async create(payload:ProductsDataType): Promise<Types.ObjectId> {
        const hash: DBType<ProductType> = await productsModel.create(payload as ProductType)
        return hash._id
    }

    async getAll(payload:ProductsDataType): Promise<ResponseWithMetaType<DBType<ProductType>[]>> {
        const { page, size, section, filter } = payload as GetDataTypeProducts

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
        const total: number = await productsModel.countDocuments(searchObj)
        const data: Array<DBType<ProductType>> = await productsModel.find(searchObj)
            .skip(offset)
            .limit(Number(size))
            .sort({ title: 1 })
            .lean()
        if (data.length == 0) throw ApiError.BadRequest('no products found')

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

    async getByHash(payload:ProductsDataType): Promise<DBType<ProductType>> {
        const { hash } = payload as HashType
        const data: DBType<ProductType> = await productsModel.findById(hash).lean()
        return data
    }

    async updateByHash(payloadUpdate:ProductsDataType): Promise<Types.ObjectId | boolean> {
        const { hash, payload } = payloadUpdate as UpdateProductType
        if (hash && payload) {
            const data: DBType<ProductType> | null = await productsModel.findByIdAndUpdate(hash, payload)
            return data!._id
        }
        return false
    }

    async removeByHash(payload:ProductsDataType): Promise<DBType<ProductType>> {
        const { hash } = payload as HashType
        const data: DBType<ProductType> | null = await productsModel.findByIdAndDelete(hash)
        return data!
    }
}

export const productService= new ProductsService()