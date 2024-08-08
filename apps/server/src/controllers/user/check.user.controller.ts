import { Request, Response } from 'express';
import admin from 'firebase-admin';

export const checkUserController = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      res.status(200).json({ exists: true, user: userRecord });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        res.status(200).json({ exists: false });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
}