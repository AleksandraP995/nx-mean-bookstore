import { checkIfSuperAdmin, toggleAdminClaims } from "../../services/admin.service";
import { Request, Response } from 'express';
import admin from 'firebase-admin';

export const setAdminClaimsController = async (req: Request | any, res: Response) => {
    const { uid } = req.body;
    const requesterUid = req.authId as string;
  
    try {
      const isSuperAdmin = checkIfSuperAdmin(requesterUid);
      if (!isSuperAdmin) {
        return res.status(403).send({ error: 'Only super admins can change admin roles' });
      }
  
      const user = await admin.auth().getUser(uid);
      const currentClaims = user.customClaims || {};
      const isAdmin = !!currentClaims.admin;
  
      await toggleAdminClaims(uid, isAdmin);
      res.status(200).json({
        message: isAdmin ? 'Admin claims removed successfully' : 'Admin claims set successfully'
      })
    } catch (error) {
      console.error('Error setting admin claims', error);
      res.status(500).send({ error: 'Failed to set admin claims' });
    }
  }

