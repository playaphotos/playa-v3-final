import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// 1. You will replace these with your REAL keys from the Firebase Console later.
// For now, these are placeholders so the app compiles without crashing.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSy_PLACEHOLDER",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "playa-photos.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "playa-photos",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "playa-photos.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3. Export Services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;