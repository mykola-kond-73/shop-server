import { NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs/promises'
import { Responce } from '../utils/responceObject'
import { GetDataTypeProducts, ProductType } from '../types/models/productsTypes'
import { SectionsType } from '../types/models/modelsTypes'
import { HashType } from '../types/models/modelsTypes'
import { UpdateProductType } from '../types/models/productsTypes'
import { productService } from '../services/products'

class ProductsController{
    async getProducts (req: Request, res: Response,next:NextFunction)  {
        try {
    
            const query: GetDataTypeProducts = {
                page: Number(req.query.pg),
                size: Number(req.query.sz),
                section: req.query.sct as SectionsType | 'null',
                filter: JSON.parse(String(req.query.filter))
            }
            const data = await productService.getAll(query)
    
            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async postProducts  (req: Request, res: Response,next:NextFunction) {
        try {
            const data = await productService.create(req.body as ProductType)
    
            return res.status(201).json(new Responce(201, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    // async upload(req:Request,res:Response){
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

    async getByHashProducts (req: Request, res: Response,next:NextFunction) {
        try {
            const data = await productService.getByHash(req.params as HashType)
    
            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async putByHAshProducts (req: Request, res: Response,next:NextFunction) {
        try {
            const query: UpdateProductType = {
                hash: req.params.hash,
                payload: req.body
            }
            const data = await productService.updateByHash(query)
    
            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async deleteByHashProducts (req: Request, res: Response,next:NextFunction)  {
        try {
            await productService.removeByHash(req.params as HashType)
    
            return res.status(204).json(new Responce(204))
        } catch (error: any) {
            next(error)
        }
    }
}

export const productsController = new ProductsController()