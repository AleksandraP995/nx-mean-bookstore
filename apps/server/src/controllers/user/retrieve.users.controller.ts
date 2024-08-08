import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { adminUsersRetrieve } from '../../services/user/adminUsers.service';

export const retrieveUsersController = async (req: Request, res: Response) => {
  try {
    const userList = await admin.auth().listUsers();
    const users = userList.users;

    const usersWithAdminStatus = users.map((userRecord) => {
      const user = adminUsersRetrieve(userRecord);
      return user;
    });

    res.json({
      message: 'Users successfully retrieved',
      users: usersWithAdminStatus,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
