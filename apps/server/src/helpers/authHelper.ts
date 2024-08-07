import { CustomClaims } from '@org-bookstore/app-configuration';
import admin from 'firebase-admin';

async function setUserClaims(email: string) {
  const userRecord = await admin.auth().getUserByEmail(email);

  if (email === 'admin@gmail.com') {
    await admin.auth().setCustomUserClaims(userRecord.uid, { superAdmin: true });
    console.log('Super admin claims set for user:', email);
  }

  if (email === 'mica@gmail.com') {
    await admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
    console.log('Admin claims set for user:', email);
  }

  return admin.auth().getUser(userRecord.uid);
}

function checkAdminClaims(customClaims: CustomClaims) {
  return customClaims ? customClaims.admin || customClaims.superAdmin : false;
}

function checkSuperAdminClaims(customClaims: CustomClaims) {
  return customClaims && customClaims.superAdmin ? true : false;
}

export {
  setUserClaims,
  checkAdminClaims,
  checkSuperAdminClaims,
};


