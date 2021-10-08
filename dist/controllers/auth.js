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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSingIn = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../db/config"));
const generate_jwt_1 = require("../helpers/generate-jwt");
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
// Reference to collection of users in firebase
const userRef = config_1.default.collection('users');
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { pass, identification } = resp.docs[0].data();
        const validPassword = bcryptjs_1.default.compareSync(password, pass);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Incorrect password'
            });
        }
        // create JWT
        const token = yield (0, generate_jwt_1.generateJWT)(identification);
        const documents = (0, returnDocsFirebase_1.returnDocsFirebase)(resp);
        res.json({
            ok: true,
            token,
            documents
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
    try {
        res.json({
            msg: 'googleSingIn method'
        });
    }
    catch (error) {
        console.log(`Error in login: ${error}`);
        return res.status(500).json({
            msg: 'Error'
        });
    }
});
exports.googleSingIn = googleSingIn;
//# sourceMappingURL=auth.js.map