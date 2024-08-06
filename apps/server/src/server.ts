import express from 'express';
import bodyParser from 'body-parser';
// import serviceAccount from './config/serviceAccountKey.json';
import { serviceAccountKey } from './config/serviceAccountKey';
import config from './config/config';
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

// Middleware
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
  databaseURL: config.firebase_url,
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api', adminRouter);
app.use('/api', userRouter);
app.use('/favorites', bookRouter);
app.use('/pdf', pdfGeneratorRouter);

// Serve static files from the frontend build directory
const buildPath = path.join(__dirname, 'dist/out-tsc/src');
app.use(express.static(buildPath));

// Serve the frontend application for any unknown routes
app.get('*', (_req: any, res: { sendFile: (arg0: string) => void }) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('Failed to connect to PostgreSQL', err);
  });


// sad je odvojenom folderu postgre, ne mongodb
// mongoose.connect('mongodb://localhost:27017/bookstoreDB', {
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err: any) => {
//   console.error('Failed to connect to MongoDB', err);
// });