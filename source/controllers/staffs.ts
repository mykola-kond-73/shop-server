import { NextFunction, Request, Response } from 'express'
import { Responce } from '../utils/responceObject'
import { GetDataType } from '../types/models/modelsTypes'
import { StaffFilterType, StaffType } from '../types/models/staffTypes'
import { HashType } from '../types/models/modelsTypes'
import { UpdateStaffType } from '../types/models/staffTypes'
import { staffService } from '../services/staff'

class StaffsController{
    async getStaff (req: Request, res: Response,next:NextFunction) {
        try {
            const query: GetDataType<StaffFilterType> = {
                page: Number(req.query.page),
                size: Number(req.query.size),
                filter: JSON.parse(String(req.query.filter))
            }
    
            const data = await staffService.getAll(query)
    
            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async postStaff  (req: Request, res: Response,next:NextFunction) {
        try {
            const data = await staffService.create(req.body as StaffType)
    
            return res.status(201).json(new Responce(201, '', data))
        } catch (error: any) {
            next(error)
        }
    }

    async getByHashStaff  (req: Request, res: Response,next:NextFunction)  {
        try {
            const data = await staffService.getByHash(req.params as HashType)
    
            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async putByHAshStaff  (req: Request, res: Response,next:NextFunction)  {
        try {
            const query: UpdateStaffType = {
                hash: req.params.hash,
                payload: req.body
            }
            const data = await staffService.updateByHash(query)
    
            return res.status(200).json(new Responce(200, '', data))
        } catch (error: any) {
            next(error)
        }
    }
    
    async deleteByHashStaff  (req: Request, res: Response,next:NextFunction) {
        try {
            await staffService.deleteByHash(req.params as HashType)
    
            return res.status(204).json(new Responce(204))
        } catch (error: any) {
            next(error)
        }
    }
}

export const staffsController = new StaffsController()