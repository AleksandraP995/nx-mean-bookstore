export interface BookstoreUser {
  email: string;
  id: string;
  isExpired: boolean;
  creationTime: Date;
  tokenExpirationDate: Date;
  username: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}