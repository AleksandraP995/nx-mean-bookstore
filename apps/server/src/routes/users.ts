import express, { Request, Response } from 'express';
import admin from 'firebase-admin';
import {
  calculateTokenExpirationDate,
} from '../helpers/userHelper';
import {
  checkAdminClaims,
  checkSuperAdminClaims,
  setUserClaims
} from '../helpers/authHelper';

const router = express.Router();

// retrieve all users from firebase users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const userList = await admin.auth().listUsers();
    const users = userList.users;

    const usersWithAdminStatus = users.map((userRecord) => {
      const isAdmin = checkAdminClaims(userRecord.customClaims);
      const isSuperAdmin = checkSuperAdminClaims(userRecord.customClaims);
      const {
        tokenExpirationDate,
        isExpired,
      } = calculateTokenExpirationDate(userRecord.metadata.creationTime);

      return {
        email: userRecord.email,
        username: userRecord.displayName, 
        id: userRecord.uid,
        isAdmin: isAdmin,
        isSuperAdmin: isSuperAdmin,
        isExpired: isExpired,
        tokenExpirationDate: tokenExpirationDate,
        creationTime: userRecord.metadata.creationTime,
      };
    });

    res.json({
      message: 'Users successfully retrieved',
      users: usersWithAdminStatus,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// add new user
router.post('/add-user', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    console.log('Request received:', req.body);

    const userRecord = await admin.auth().createUser({ email, password });

    const updatedUserRecord = await setUserClaims(email);

    const isAdmin = checkAdminClaims(updatedUserRecord.customClaims);
    const isSuperAdmin = checkSuperAdminClaims(updatedUserRecord.customClaims);
    const {
      tokenExpirationDate,
      isExpired,
    } = calculateTokenExpirationDate(userRecord.metadata.creationTime);

    const newUser = {
      email: userRecord.email,
      username: username,
      id: userRecord.uid,
      isAdmin: isAdmin,
      isSuperAdmin: isSuperAdmin,
      isExpired: isExpired,
      tokenExpirationDate: tokenExpirationDate,
      creationTime: userRecord.metadata.creationTime,
    };

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    console.error('Error adding user email:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// update user email
router.post('/update-email', async (req: Request, res: Response) => {
  const { userId, newEmail } = req.body;

  // Basic validation
  if (!userId || !newEmail) {
    return res.status(400).json({ error: 'Missing userId or newEmail' });
  }

  try {
    console.log(
      `Attempting to update user ${userId} with new email ${newEmail}`
    );
    const userRecord = await admin.auth().updateUser(userId, { email: newEmail });
    console.log('User email updated successfully:', userRecord);
    res
      .status(200)
      .json({ message: 'User email updated successfully', userRecord });
  } catch (error) {
    console.error('Error updating user email:', error);
    res.status(500).json({ error: 'Failed to update user email' });
  }
});

router.delete('/delete-user', async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    await admin.auth().deleteUser(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user :', error);
    res.status(500).json({ error: 'Failed to update user email' });
  }
});

router.post('/check-user', async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    res.status(200).json({ exists: true, user: userRecord });
  } catch (error:any) {
    if (error.code === 'auth/user-not-found') {
      res.status(200).json({ exists: false });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router;

