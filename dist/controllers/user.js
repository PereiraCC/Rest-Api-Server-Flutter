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
exports.deleteUser = exports.putUser = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../db/config"));
const user_1 = __importDefault(require("../models/user"));
// import { returnDocsFirebase } from "../helpers/returnDocsFirebase";
// Reference to collection of agents in firebase
const agentRef = config_1.default.collection('users');
const getUsers = (req, res) => {
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
};
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
        const user = new user_1.default(identification, name, email, encryptPass, true);
        // Get JSON data
        const data = user.fromJson();
        // Add new agent in the database
        const doc = yield agentRef.add(data);
        // Send data
        res.status(201).json({
            ok: true,
            id_user: doc.id,
            data
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