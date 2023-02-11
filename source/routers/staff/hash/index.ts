import { Request, Response } from 'express'
import { Responce } from '../../../utils/responceObject'
import { StaffControl } from '../../../controllers/staff'
import { HashType } from '../../../types/models/modelsTypes'
import { UpdateStaffType } from '../../../types/models/staffTypes'
import { errorLogger } from '../../../utils/loger'

const getByHashStaff = async (req: Request, res: Response) => {
    try {
        const staff = new StaffControl(req.params as HashType)
        const data = await staff.getByHash()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no staff was found for your query'))
    }
}

const putByHAshStaff = async (req: Request, res: Response) => {
    try {
        const query: UpdateStaffType = {
            hash: req.params.hash,
            payload: req.body
        }
        const staff = new StaffControl(query)
        const data = await staff.updateByHash()

        return res.status(200).json(new Responce(200, '', data))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no staff was found for your query'))
    }
}

const deleteByHashStaff = async (req: Request, res: Response) => {
    try {
        const staff = new StaffControl(req.params as HashType)
        await staff.deleteByHash()

        return res.status(204).json(new Responce(204))
    } catch (error: any) {
        errorLogger.error(`status:400 ${error.message}`)

        return res.status(400).json(new Responce(400, 'no staff was found for your query'))
    }
}

export {
    getByHashStaff,
    putByHAshStaff,
    deleteByHashStaff
}