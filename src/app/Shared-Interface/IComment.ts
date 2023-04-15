import { IUser } from "./IUser";

export interface IComment {
    id: number,
    postId: number,
    userId: string,
    likes: number,
    date: Date,
    content: string,
    updated: boolean,
    user: IUser
} 