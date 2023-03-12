import { Types } from 'mongoose'
import { AuthCheckUserType } from '../types/models/authTypes'

export class UserDto{
    email:string
    id:Types.ObjectId

    constructor(userData:any){
        this.email=userData.email
        this.id=userData._id
    }
}