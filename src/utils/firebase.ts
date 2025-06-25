// Firebase initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CONFIG } from './env';

// Initialize Firebase
console.log('Initializing Firebase...');
const app = initializeApp(FIREBASE_CONFIG);

// Initialize Firebase Auth
const auth = getAuth(app);
console.log('Firebase Auth initialized');

export { app, auth }; 