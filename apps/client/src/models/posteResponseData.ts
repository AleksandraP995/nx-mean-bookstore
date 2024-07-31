import { FirebaseUser } from './firebaseUser';
export interface PostResponsePayload {
    message: string
}
export interface PostNewUserResponse {
    message: string,
    user:FirebaseUser
}

export const DeleteResponsePayload:Object = {
    message: ''
}