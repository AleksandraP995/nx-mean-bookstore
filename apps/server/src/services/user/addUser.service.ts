import { BookstoreUser } from '@org-bookstore/app-configuration';
import {
  checkAdminClaims,
  checkSuperAdminClaims,
  setUserClaims,
} from '../../utils/helpers/auth.helper';
import { calculateTokenExpirationDate } from '../../utils/helpers/user.helper';
import admin from 'firebase-admin';

export async function addUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const userRecord = await admin.auth().createUser({ email, password });

    const updatedUserRecord = await setUserClaims(email);

    const isAdmin = checkAdminClaims(updatedUserRecord.customClaims);
    const isSuperAdmin = checkSuperAdminClaims(updatedUserRecord.customClaims);
    const { tokenExpirationDate, isExpired } = calculateTokenExpirationDate(
      userRecord.metadata.creationTime
    );

    const newUser: BookstoreUser = {
      email: userRecord.email,
      username: username,
      id: userRecord.uid,
      isAdmin: isAdmin,
      isSuperAdmin: isSuperAdmin,
      isExpired: isExpired,
      tokenExpirationDate: tokenExpirationDate,
      creationTime: userRecord.metadata.creationTime,
    };
    return newUser;
  } catch (err) {
    throw new Error(`Error adding new user ${username}`);
  }
}
