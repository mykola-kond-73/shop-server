import { AuthModel } from '../models/auth'
import { AuthDataType } from '../types/models/authTypes';
import jwt from 'jsonwebtoken'
import {key} from '../utils/env/keys'

export class AuthControl {
    models: { auth: AuthModel }

    constructor(data: AuthDataType) {
        this.models = {
            auth: new AuthModel(data)
        };
    }

    async login() {
        const data = await this.models.auth.login();
        const token = jwt.sign(data, key!, { expiresIn: 60 * 60 * 1000 })

        return {id:data._id,token};
    }

    async loginCust() {
        const data = await this.models.auth.loginCust()
        const token = jwt.sign(data, key!, {expiresIn: 60 * 60 * 1000})

        return {id:data._id,token}
    }
}