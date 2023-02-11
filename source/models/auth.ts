import bcrypt from 'bcrypt'
import {customers} from '../odm/customers'
import {staff} from '../odm/staff'
import { AuthCheckUserType, AuthDataType } from '../types/models/authTypes';

export class AuthModel {
    data:AuthDataType

    constructor(data:AuthDataType) {
        this.data = data;
    }

    async login() {
        const {email,password} = this.data

        const data:AuthCheckUserType = await staff.findOne({email})
            .select('password email')
            .lean()

        const result = await bcrypt.compare(password,data.password)
        if (!result) throw new Error('credentials not valid')

        return data
    }

    async loginCust() {
        const {email,password} = this.data

        const data:AuthCheckUserType = await customers.findOne({email})
            .select('password email')
            .lean()

        const result = await bcrypt.compare(password, data.password)
        if (!result) throw new Error('credentials not valid')

        return data
    }
}