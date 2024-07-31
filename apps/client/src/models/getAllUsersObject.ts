import { ExtendedFirebaseUser } from "./firebaseUser";
import { BookstoreUser } from "./user";

export interface GetAllUsersObject {
    message: string,
    users : BookstoreUser[]
}