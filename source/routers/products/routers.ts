import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { Responce } from '../../utils/responceObject'
import { ProductsControls } from '../../controllers/products'
import { GetDataTypeProducts, ProductType } from '../../types/models/productsTypes'
import { SectionsType } from '../../types/models/modelsTypes'
import { errorLogger } from '../../utils/loger'

const getProducts = async (req: Request, res: Response) => {
    try {

        const query: GetDataTypeProducts = {
            page: Number(req.query.pg),
            size: Number(req.query.sz),
            section: req.query.sct as SectionsType | 'null',
            filter: JSON.parse(String(req.query.filter))
        }
        const products = new ProductsControls(query)
        const data = await products.getAll()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no products found'))
    }
}

const postProducts = async (req: Request, res: Response) => {
    try {
        const products = new ProductsControls(req.body as ProductType)
        const data = await products.create()

        return res.status(201).json(new Responce(201, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'failed to create product'))
    }
}

// const upload=async(req:Request,res:Response)=>{
//     try{
//         console.log('body',req.body)
//         console.log('files',req.files)

//         const file=req.files.myFile
//         const pathFile=path.resolve(__dirname,'../../../uploads/',`user1/${Date.now()}.${file.name.split('.').pop()}`)
//         file.mv(pathFile)

//         return res.sendStatus(201)
//     }catch(e:any){
//         console.log(e)
//         return res.status(400).json(new Responce(400,error.message))
//     }
// }

export {
    getProducts,
    postProducts
    // upload
}