import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_apiKey,
  authDomain: process.env.NEXT_APP_authDomain,
  projectId: process.env.NEXT_APP_projectId,
  storageBucket: process.env.NEXT_APP_storageBucket,
  messagingSenderId: process.env.NEXT_APP_messagingSenderId,
  appId: process.env.NEXT_APP_appId,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
