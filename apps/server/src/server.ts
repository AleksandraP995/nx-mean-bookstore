import express from 'express';
import bodyParser from 'body-parser';
// import serviceAccount from './config/serviceAccountKey.json';
import { serviceAccountKey } from './config/serviceAccountKey';
import config from './config/config';
import path from 'path';
import * as admin from 'firebase-admin';
import adminRoutes from './routes/admin';
import userRoutes from './routes/users';
import bookRoutes from "./routes/books";
import cors from 'cors';
import { connectDB } from './postgre/postgreClient';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
  databaseURL: config.firebase_url,
});

app.use(cors());
app.use(bodyParser.json());

app.use('/api', adminRoutes);
app.use('/api', userRoutes);
app.use('/favorites', bookRoutes);

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
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error('Failed to connect to PostgreSQL', err);
  });


// sad je odvojenom folderu postgre
// mongoose.connect('mongodb://localhost:27017/bookstoreDB', {
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err: any) => {
//   console.error('Failed to connect to MongoDB', err);
// });