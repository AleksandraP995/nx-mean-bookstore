
import { Request, Response } from 'express';
import { addUser } from '../../services/user/addUser.service';

export const addUserController = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  try {
    const addedUser = await addUser(email, password, username);
    res.status(201).json({ message: 'User added successfully', user: addedUser });
  } catch (error) {
    console.error('Error adding user email:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

export default { addUserController };
