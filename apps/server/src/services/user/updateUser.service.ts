import admin from 'firebase-admin';

export async function updateUser(userId, newEmail) {
  try {
    console.log(
      `Attempting to update user ${userId} with new email ${newEmail}`
    );
    const userRecord = await admin
      .auth()
      .updateUser(userId, { email: newEmail });
    console.log('User email updated successfully:', userRecord);
    return userRecord;
  } catch (err) {
    throw new Error(' Unable to update user');
  }
}
