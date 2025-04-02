
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBQw455UafzUpfgq4ljXkPZESw-GB82TNk",
    authDomain: "petcare-72cb3.firebaseapp.com",
    databaseURL: "https://petcare-72cb3-default-rtdb.firebaseio.com",
    projectId: "petcare-72cb3",
    storageBucket: "petcare-72cb3.firebasestorage.app",
    messagingSenderId: "260202310465",
    appId: "1:260202310465:web:3bcf0f0a725c4cf9674fc0"
  };


  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
