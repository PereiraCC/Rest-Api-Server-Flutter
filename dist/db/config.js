"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = __importDefault(require("firebase/app"));
const firestore_1 = require("firebase/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
exports.default = (0, firestore_1.getFirestore)();
//# sourceMappingURL=config.js.map