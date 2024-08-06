import { BookstoreUser } from './user';

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

export interface AddBookToFavoritesObject {
    id: number,
    user_id: string,
    book_id: string
    created_at: string    
}