import { Request, Response } from 'express'
import { Responce } from '../../../utils/responceObject'
import { ProductsControls } from '../../../controllers/products'
import { HashType } from '../../../types/models/modelsTypes'
import { UpdateProductType } from '../../../types/models/productsTypes'
import { errorLogger } from '../../../utils/loger'

const getByHashProducts = async (req: Request, res: Response) => {
    try {
        const products = new ProductsControls(req.params as HashType)
        const data = await products.getByHash()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no product was found for your query'))
    }
}

const putByHAshProducts = async (req: Request, res: Response) => {
    try {
        const query: UpdateProductType = {
            hash: req.params.hash,
            payload: req.body
        }
        const products = new ProductsControls(query)
        const data = await products.updateByHash()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no product was found for your query'))
    }
}

const deleteByHashProducts = async (req: Request, res: Response) => {
    try {
        const products = new ProductsControls(req.params as HashType)
        await products.removeByHash()

        return res.status(204).json(new Responce(204))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no product was found for your query'))
    }
}

export {
    getByHashProducts,
    putByHAshProducts,
    deleteByHashProducts
}