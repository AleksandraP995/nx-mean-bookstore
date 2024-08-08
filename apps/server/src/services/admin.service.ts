import admin from 'firebase-admin';
import {
  checkAdminClaims,
  checkSuperAdminClaims,
} from '../utils/helpers/auth.helper';
import { calculateTokenExpirationDate } from '../utils/helpers/user.helper';
import { BookstoreUser } from '@org-bookstore/app-configuration';

export async function checkIfSuperAdmin(uid: string): Promise<boolean> {
  try {
    const requester = await admin.auth().getUser(uid);
    return requester.customClaims?.superAdmin ?? false;
  } catch (err) {
    throw new Error('Error retrieving user data');
  }
}

export async function toggleAdminClaims(uid: string, isAdmin: boolean) {
  try {
    const claims = isAdmin ? { admin: true } : { admin: null };
    await admin.auth().setCustomUserClaims(uid, claims);
  } catch (error) {
    throw new Error('Error updating custom claims');
  }
}

export async function verifyToken(token: string) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    const isAdmin = checkAdminClaims(userRecord.customClaims);
    const isSuperAdmin = checkSuperAdminClaims(userRecord.customClaims);
    const { tokenExpirationDate, isExpired } = calculateTokenExpirationDate(
      userRecord.metadata.creationTime
    );

    const verifiedUser: BookstoreUser = {
      id: userRecord.uid,
      email: userRecord.email,
      isAdmin: isAdmin,
      isSuperAdmin: isSuperAdmin,
      tokenExpirationDate: tokenExpirationDate,
      isExpired: isExpired,
      creationTime: userRecord.metadata.creationTime,
    };
    return verifiedUser;
  } catch (error) {
    throw new Error('Error verifying token');
  }
}
