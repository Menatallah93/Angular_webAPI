import { IUser } from '../Shared-Interface/IUser';
export interface IPost {
    id: number,
    userId: string
    postContent: string,
    like: number,
    created: Date,
    user:IUser
}