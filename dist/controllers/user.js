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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../db/config"));
const user_1 = __importDefault(require("../models/user"));
// Reference to collection of agents in firebase
const userRef = config_1.default.collection('users');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({
            msg: 'get all users'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: Get all users'
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => {
    try {
        return res.status(200).json({
            msg: 'get a user'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: Get a user'
        });
    }
};
exports.getUserById = getUserById;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data from body
    const { identification, name, email, password } = req.body;
    try {
        // Encrypt password
        const salt = bcryptjs_1.default.genSaltSync();
        const encryptPass = bcryptjs_1.default.hashSync(password, salt);
        // Create new instance of agent class
        const user = new user_1.default(identification, name, email, encryptPass, true, false);
        // Get JSON data
        const data = user.fromJson();
        // Add new agent in the database
        const doc = yield userRef.add(data);
        const { pass } = data, newUser = __rest(data, ["pass"]);
        // Send data
        res.status(201).json({
            ok: true,
            id_user: doc.id,
            newUser
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: create a user'
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => {
    try {
        return res.status(200).json({
            msg: 'update a user'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: update a user'
        });
    }
};
exports.putUser = putUser;
const deleteUser = (req, res) => {
    try {
        return res.status(200).json({
            msg: 'delete a user'
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: delete a user'
        });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.js.map