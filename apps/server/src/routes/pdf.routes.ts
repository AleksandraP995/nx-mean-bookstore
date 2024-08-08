import express from 'express';
import generatePDFController from '../controllers/pdf.controller';

const router = express.Router();

router.post('/create-pdf', generatePDFController);

export default router;