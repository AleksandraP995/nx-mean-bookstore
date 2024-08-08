import { verifyToken } from '../../services/admin.service';
import { Request, Response } from 'express';

export const verifyClaimsController = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const verifiedUser = verifyToken(token);
    res.status(200).json(verifiedUser);
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(500).json({ error: 'Failed to verify token' });
  }
};
