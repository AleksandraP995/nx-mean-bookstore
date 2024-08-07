import express from 'express';
import bodyParser from 'body-parser';
import { serviceAccountKey } from './config/serviceAccountKey';
import path from 'path';
import * as admin from 'firebase-admin';
import adminRouter from './routes/admin';
import userRouter from './routes/users';
import bookRouter from "./routes/books";
import pdfGeneratorRouter from "./routes/pdf";
import cors from 'cors';
import { connectDB } from './postgre/postgreClient';
import dotenv from 'dotenv';
import { setupWebSocket } from './websocket/webSocketSetup';

dotenv.config();
const app = express();

const { server } = setupWebSocket(app);

app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_URL,
});

app.use(cors());
app.use(bodyParser.json());

app.use('/admin', adminRouter);
app.use('/api', userRouter);
app.use('/favorites', bookRouter);
app.use('/pdf', pdfGeneratorRouter);

const buildPath = path.join(__dirname, 'dist/out-tsc/src');
app.use(express.static(buildPath));

app.get('*', (_req, res: { sendFile: (arg0: string) => void }) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to PostgreSQL', err);
  });
