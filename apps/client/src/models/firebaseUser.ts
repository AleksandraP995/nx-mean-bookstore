export interface ExtendedFirebaseUser extends FirebaseUser {
  isAdmin: boolean;
}


export interface FirebaseUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    disabled: boolean;
    metadata: {
      lastSignInTime: string;
      creationTime: string;
      lastRefreshTime: string;
    };
    passwordHash: string;
    passwordSalt: string;
    tokensValidAfterTime: string;
    providerData: {
      uid: string;
      email: string;
      providerId: string;
    }[];
  }

  