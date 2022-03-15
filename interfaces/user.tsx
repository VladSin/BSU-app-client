import {IAnswer} from "./answer";

export interface IUser {
    id: string
    firstName: string
    lastName: string
    groupName: string
    role: string
    answers?: IAnswer[]
}