"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid = '') => {
    try {
        return new Promise((resolve, reject) => {
            const payload = { uid };
            jsonwebtoken_1.default.sign(payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('The token could not be generated');
                }
                else {
                    resolve(token);
                }
            });
        });
    }
    catch (error) {
        console.log(`Error generateJWT: ${error}`);
        return new Error('Error generate Json Web Token');
    }
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=generate-jwt.js.map