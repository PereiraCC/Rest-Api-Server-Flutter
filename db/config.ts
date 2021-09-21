// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";

// Import and configure dotenv
import dotenv from 'dotenv';
dotenv.config();

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

console.log('Firabase is ready');

export default firebase.firestore();