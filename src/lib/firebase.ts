import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// CRASH-PROOF ENV LOADER
const getEnv = (key: string) => {
  let value = '';

  // 1. Try Vite (Modern Vercel)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      // @ts-ignore
      value = import.meta.env[`VITE_${key}`] || import.meta.env[`REACT_APP_${key}`] || '';
    }
  } catch (e) {
    // Ignore error
  }

  // 2. Try Standard React (Create-React-App)
  // Only check 'process' if we haven't found a value yet to avoid ReferenceError
  if (!value) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        value = process.env[`REACT_APP_${key}`] || '';
      }
    } catch (e) {
      // Ignore error
    }
  }
  
  return value;
};

const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID')
};

// SAFETY CHECK: Prevent empty config crash
if (!firebaseConfig.apiKey) {
  console.warn("Firebase Config missing. App may not function correctly.");
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;