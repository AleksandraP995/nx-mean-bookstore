import { Request, Response } from 'express';
import admin from 'firebase-admin';

export const deleteUserController = async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
      await admin.auth().deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user :', error);
      res.status(500).json({ error: 'Failed to update user email' });
    }
  }