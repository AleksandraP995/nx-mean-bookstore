export interface BookstoreUser {
    id: string;
    email: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
    tokenExpirationDate: Date;
    isExpired: boolean;
    creationTime: Date;
    username?: string;
}

export interface VerifyTokenRequest {
    token: string;
}