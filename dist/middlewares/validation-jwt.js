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
exports.validationJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../db/config"));
const user_1 = require("../models/user");
// Reference to collection of users in firebase
const userRef = config_1.default.collection('users');
const validationJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No token'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
        // leer el usuario que corresponde al uid
        const resp = yield userRef.where('status', '==', true)
            .where('identification', '==', uid).get();
        if (resp.docs.length == 0) {
            return res.status(401).json({
                msg: 'Token - not valid - user does not exist in DB'
            });
        }
        req.user = (0, user_1.toJson)(resp.docs[0].data());
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
});
exports.validationJWT = validationJWT;
//# sourceMappingURL=validation-jwt.js.map