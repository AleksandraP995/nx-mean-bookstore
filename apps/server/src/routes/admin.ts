/* eslint-disable @typescript-eslint/ban-types */
import express, { Request, Response } from 'express';
import { checkAdminClaims, checkSuperAdminClaims } from '../helpers/authHelper';
import { calculateTokenExpirationDate } from '../helpers/userHelper';
import admin from 'firebase-admin';
import authenticate from '../middlewares/authentication.middleware';
import { BookstoreUser } from '@org-bookstore/app-configuration';

const router = express.Router();

router.post('/set-admin-claims', authenticate, async (req: Request | any, res: Response) => {
  const { uid } = req.body;
  const requesterUid = req.authId as string;

  try {
    // First, check if the requester is a super admin
    const requester = await admin.auth().getUser(requesterUid);
    if (!requester.customClaims || !requester.customClaims.superAdmin) {
      return res.status(403).send({ error: 'Only super admins can change admin roles' });
    }

    const user = await admin.auth().getUser(uid);
    const currentClaims = user.customClaims || {};
    const isAdmin = currentClaims.admin || false;

    if (isAdmin) {
      await admin.auth().setCustomUserClaims(uid, { admin: null });
      res.status(200).send({ message: 'Admin claims removed successfully' });
    } else {
      await admin.auth().setCustomUserClaims(uid, { admin: true });
      res.status(200).send({ message: 'Admin claims set successfully' });
    }
  } catch (error) {
    console.error('Error setting admin claims', error);
    res.status(500).send({ error: 'Failed to set admin claims' });
  }
});

router.post('/verify-token', async (req: Request<{}, {}, BookstoreUser | any>, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    const isAdmin = checkAdminClaims(userRecord.customClaims);
    const isSuperAdmin = checkSuperAdminClaims(userRecord.customClaims);
    const { tokenExpirationDate, isExpired } = calculateTokenExpirationDate(userRecord.metadata.creationTime);

    res.status(200).json({
      id: userRecord.uid,
      email: userRecord.email,
      isAdmin: isAdmin,
      isSuperAdmin: isSuperAdmin,
      tokenExpirationDate: tokenExpirationDate,
      isExpired: isExpired,
      creationTime: new Date(userRecord.metadata.creationTime)
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ error: 'Failed to verify token' });
  }
});

export default router;

