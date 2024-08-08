import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as admin from 'firebase-admin';
import adminRouter from './routes/admin.routes';
import userRouter from './routes/users.routes';
import bookRouter from "./routes/favorites.routes";
import pdfGeneratorRouter from "../src/routes/pdf.routes";
import cors from 'cors';
import { connectDB } from './services/database/postgres.client';
import dotenv from 'dotenv';
import { setupWebSocket } from './services/websocket.service';

// Load environment variables
dotenv.config();
  
const app = express();

// Setup WebSocket
const { server } = setupWebSocket(app);

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

// Routes
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
