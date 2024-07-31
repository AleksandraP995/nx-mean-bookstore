// src/firebase-init.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';

// Initialize Firebase
const firebaseApp = initializeApp(environment.firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };
