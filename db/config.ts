// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey            : process.env.APIKEYDB,
  authDomain        : process.env.AUTHDOMAINDB,
  databaseURL       : process.env.DATABASEURLDB,
  projectId         : process.env.PROJECTIDDB,
  storageBucket     : process.env.STORAGEBUCKET,
  messagingSenderId : process.env.MESSAGINGSENDERIDDB,
  appId             : process.env.APPIDDB,
  measurementId     : process.env.MEASUREMENTIDDB
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default getFirestore();