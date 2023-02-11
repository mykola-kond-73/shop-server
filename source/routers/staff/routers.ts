import { Request, Response } from 'express'
import { Responce } from '../../utils/responceObject'
import { StaffControl } from '../../controllers/staff'
import { GetDataType } from '../../types/models/modelsTypes'
import { StaffFilterType, StaffType } from '../../types/models/staffTypes'
import { errorLogger } from '../../utils/loger'

const getStaff = async (req: Request, res: Response) => {
    try {
        const query: GetDataType<StaffFilterType> = {
            page: Number(req.query.page),
            size: Number(req.query.size),
            filter: JSON.parse(String(req.query.filter))
        }

        const staff = new StaffControl(query)
        const data = await staff.getAll()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)
        return res.status(400).json(new Responce(400, 'no staff found'))
    }
}

const postStaff = async (req: Request, res: Response) => {
    try {
        const staff = new StaffControl(req.body as StaffType)
        const data = await staff.create()

        return res.status(201).json(new Responce(201, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)
        return res.status(400).json(new Responce(400, 'failed to create staff'))
    }
}

export {
    getStaff,
    postStaff
}