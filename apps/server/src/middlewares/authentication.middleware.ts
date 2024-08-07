import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).authId = decodedToken.uid;
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).send({ error: 'Unauthorized' });
  }
};

export default authenticate;
