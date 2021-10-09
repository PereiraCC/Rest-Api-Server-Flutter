"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSingIn = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../db/config"));
const generate_jwt_1 = require("../helpers/generate-jwt");
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
const google_verify_1 = require("../helpers/google-verify");
const user_1 = __importDefault(require("../models/user"));
// Reference to collection of users in firebase
const userRef = config_1.default.collection('users');
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data from body
    const { email, password } = req.body;
    try {
        // Get all users with status true and email equal
        const resp = yield userRef.where('status', '==', true)
            .where('email', '==', email).get();
        // Verification if there are documents
        if (resp.docs.length == 0) {
            return res.status(404).json({
                msg: 'User not found in the database.'
            });
        }
        // Get user pass and identification
        const { pass, identification } = resp.docs[0].data();
        // Decrypt password
        const validPassword = bcryptjs_1.default.compareSync(password, pass);
        // Verification if correct password
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Incorrect password'
            });
        }
        // create JWT (Json Web Token)
        const token = yield (0, generate_jwt_1.generateJWT)(identification);
        // Send data
        res.json({
            ok: true,
            token,
            documents: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
        });
    }
    catch (error) {
        console.log(`Error in login: ${error}`);
        return res.status(500).json({
            msg: 'Error'
        });
    }
});
exports.login = login;
const googleSingIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get id token google
    const { id_token } = req.body;
    try {
        // Get user google name, picture, email
        const { name, picture, email } = yield (0, google_verify_1.verify)(id_token);
        // Get all users with email equal
        const resp = yield userRef.where('email', '==', email).get();
        // Verification if there are documents
        if (resp.docs.length == 0) {
            const resp = yield createNewUserGoogle(name || '', email || '', picture || '', id_token);
            return res.status(201).json(resp);
        }
        // Verification user blocked
        if (!resp.docs[0].data().status) {
            return res.status(401).json({
                msg: 'User blocked',
            });
        }
        // Generar el JWT
        const token = yield (0, generate_jwt_1.generateJWT)(id_token);
        // Send data
        return res.json({
            msg: 'ok',
            token,
        });
    }
    catch (error) {
        console.log(`Error in login: ${error}`);
        return res.status(500).json({
            msg: 'Error google sing in method'
        });
    }
});
exports.googleSingIn = googleSingIn;
const createNewUserGoogle = (name, email, picture, id_token) => __awaiter(void 0, void 0, void 0, function* () {
    // Create new instance of agent class
    const user = new user_1.default('google-id', name || '', email || '', 'no-pass', true, true, picture);
    // Get JSON data
    const data = user.fromJson();
    // Add new user in the database
    const doc = yield userRef.add(data);
    // Get new user data without pass and status
    const { pass, status } = data, newUser = __rest(data, ["pass", "status"]);
    // Create JWT
    const token = yield (0, generate_jwt_1.generateJWT)(id_token);
    // Send data
    return {
        ok: true,
        id_user: doc.id,
        newUser,
        token
    };
});
//# sourceMappingURL=auth.js.map