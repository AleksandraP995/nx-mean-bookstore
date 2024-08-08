import express from 'express';
import { retrieveUsersController } from '../controllers/user/retrieve.users.controller';
import { addUserController } from '../controllers/user/add.user.controller';
import { updateUserController } from '../controllers/user/update.user.controller';
import { deleteUserController } from '../controllers/user/delete.user.controller';
import { checkUserController } from '../controllers/user/check.user.controller';

const router = express.Router();

router.get('/users', retrieveUsersController);
router.post('/add-user', addUserController);
router.post('/update-email', updateUserController);
router.delete('/delete-user', deleteUserController);
router.post('/check-user', checkUserController);

export default router;

