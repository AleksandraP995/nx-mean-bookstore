import { BookstoreUser } from "@org-bookstore/app-configuration"


export interface UpdateUserEmailObject {
    message: string
}
export interface CreateNewUserObject {
    message: string,
    user:BookstoreUser
}

export interface DeleteUserObject {
    message: string
}

export interface GetAllUsersObject {
    message: string,
    users : BookstoreUser[]
}
