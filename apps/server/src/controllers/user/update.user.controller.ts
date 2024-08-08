import { Request, Response } from 'express';
import { updateUser } from '../../services/user/updateUser.service';

export const updateUserController = async (req: Request, res: Response) => {
  const { userId, newEmail } = req.body;

  if (!userId || !newEmail) {
    return res.status(400).json({ error: 'Missing userId or newEmail' });
  }

  try {
    const updatedUser = await updateUser(userId, newEmail);
    res
      .status(200)
      .json({ message: 'User email updated successfully', updatedUser });
  } catch (error) {
    console.error('Error updating user email:', error);
    res.status(500).json({ error: 'Failed to update user email' });
  }
};
