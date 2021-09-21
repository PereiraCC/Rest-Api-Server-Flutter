"use strict";
// Import the functions you need from the SDKs you need
// import firebase from "firebase/app";
// import { getFirestore } from 'firebase/firestore';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig = {
    apiKey: process.env.APIKEYDB,
    authDomain: process.env.AUTHDOMAINDB,
    databaseURL: process.env.DATABASEURLDB,
    projectId: process.env.PROJECTIDDB,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERIDDB,
    appId: process.env.APPIDDB,
    measurementId: process.env.MEASUREMENTIDDB
};
// Initialize Firebase
app_1.default.initializeApp(firebaseConfig);
console.log('Firabase is ready');
exports.default = app_1.default.firestore();
//# sourceMappingURL=config.js.map