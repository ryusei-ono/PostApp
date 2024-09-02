import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCeKkwLpuoIGaaFNL4KwFY8vMHKupUIYaA',
  authDomain: 'react-project-c834d.firebaseapp.com',
  projectId: 'react-project-c834d',
  storageBucket: 'react-project-c834d.appspot.com',
  messagingSenderId: '1057608210767',
  appId: '1:1057608210767:web:71f0e715a02442aace0d3a',
  measurementId: 'G-Q9SJEDTKW8',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
