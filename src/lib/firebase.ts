import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyB0xzPNSMcSIPXmVNjQar3-a4f3u87pAA8',
  authDomain: 'react-query-todo-18e69.firebaseapp.com',
  projectId: 'react-query-todo-18e69',
  storageBucket: 'react-query-todo-18e69.appspot.com',
  messagingSenderId: '946099449400',
  appId: '1:946099449400:web:9632e7f236ea68888c00cd',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
