/* eslint-disable @typescript-eslint/ban-types */
import express from 'express';
import authenticate from '../middlewares/authentication.middleware';
import { setAdminClaimsController } from '../controllers/admin/admin.claims.controller';
import { verifyClaimsController } from '../controllers/admin/admin.verify.controller';

const router = express.Router();

router.post('/set-admin-claims', authenticate, setAdminClaimsController);

router.post('/verify-token', verifyClaimsController);

export default router;

