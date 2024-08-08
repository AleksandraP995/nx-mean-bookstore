import { BookstoreUser } from '@org-bookstore/app-configuration';
import {
  checkAdminClaims,
  checkSuperAdminClaims
} from '../../utils/helpers/auth.helper';
import { calculateTokenExpirationDate } from '../../utils/helpers/user.helper';

export async function adminUsersRetrieve(
    userRecord
) {
  try {
    const isAdmin = checkAdminClaims(userRecord.customClaims);
    const isSuperAdmin = checkSuperAdminClaims(userRecord.customClaims);
    const { tokenExpirationDate, isExpired } = calculateTokenExpirationDate(
      userRecord.metadata.creationTime
    );
    const user: BookstoreUser = {
      email: userRecord.email,
      username: userRecord.displayName,
      id: userRecord.uid,
      isAdmin,
      isSuperAdmin,
      isExpired,
      tokenExpirationDate,
      creationTime: userRecord.metadata.creationTime,
    };
    return user;
  } catch (err) {
    throw new Error(`Error checking if the user is admin`);
  }
}
