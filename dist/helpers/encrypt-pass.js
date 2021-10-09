"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPass = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encryptPass = (pass) => {
    try {
        const salt = bcryptjs_1.default.genSaltSync();
        return bcryptjs_1.default.hashSync(pass, salt);
    }
    catch (error) {
        console.log(error);
        throw new Error('Error: encrypt password');
    }
};
exports.encryptPass = encryptPass;
//# sourceMappingURL=encrypt-pass.js.map