import {CustomersModel} from '../models/customers'
import { CustomersDataType, GetAllResponseCustomersDataItem } from '../types/models/customersType'
import { DBType } from '../types/types'

export class CustomersControls{
    models:{customers:CustomersModel}

    constructor(data:CustomersDataType){
        this.models={
            customers:new CustomersModel(data)
        } 
    }

    async create(){
        const data=await this.models.customers.create()
        return data._id
    }

    async getAll(){
        const data=await this.models.customers.getAll()
        return data
    }

    async getByHash(){
        const data=await this.models.customers.getByHash()
        return data
    }

    async updateByHash(){
        const data=await this.models.customers.updateByHash()
        return data
    }

    async deleteByHash(){
        const data=await this.models.customers.deleteByHash()
        return data
    }
}