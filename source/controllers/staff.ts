import {StaffModel} from '../models/staff'
import { GetAllResponseStaffsDataItem, StaffDataType } from '../types/models/staffTypes'
import { DBType } from '../types/types'

export class StaffControl{
    models:{staff:StaffModel}

    constructor(data:StaffDataType){
        this.models={
            staff:new StaffModel(data)
        }
    }

    async create(){
        const data=await this.models.staff.create()
        return data
    }

    async getAll(){
        const data=await this.models.staff.getAll()
        return data
    }

    async getByHash(){
        const data=await this.models.staff.getByHash()
        return data
    }

    async updateByHash(){
        const data=await this.models.staff.updateByHash()
        return data
    }

    async deleteByHash(){
        const data=await this.models.staff.deleteByHash()
        return data
    } 
}