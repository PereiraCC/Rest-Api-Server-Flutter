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
exports.getUser = exports.deleteUser = exports.putUser = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const config_1 = __importDefault(require("../db/config"));
const user_1 = __importDefault(require("../models/user"));
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
const encrypt_pass_1 = require("../helpers/encrypt-pass");
// Reference to collection of users in firebase
const userRef = config_1.default.collection('users');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get params
    const { limit = 10, from = 1 } = req.query;
    try {
        // Get all data to the limit
        const data = yield userRef
            .orderBy("identification")
            .limit(limit).get();
        // Verification if docs
        if (from > data.docs.length || data.docs.length == 0) {
            return res.status(200).json({
                ok: true,
                total: 0,
                documents: []
            });
        }
        // Get data with filters
        const resp = yield userRef
            .orderBy('identification')
            .limit(limit)
            .startAt(data.docs[from - 1])
            .where('status', '==', true).get();
        // Send data
        return res.status(200).json({
            ok: true,
            total: resp.docs.length,
            documents: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
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
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get id param
        const { id } = req.params;
        // Get all users with status true and id equal
        const resp = yield userRef.where('status', '==', true)
            .where('identification', '==', id).get();
        // Verification if there are documents
        if (resp.docs.length == 0) {
            return res.status(404).json({
                msg: 'User with that ID not found in the database.'
            });
        }
        // Send data
        return res.status(200).json({
            ok: true,
            documents: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: Get a user'
        });
    }
});
exports.getUserById = getUserById;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data from body
    const { identification, name, email, password } = req.body;
    try {
        // Encrypt password
        const encrypt = (0, encrypt_pass_1.encryptPass)(password);
        // Create new instance of user class
        const user = new user_1.default(identification, name, email, encrypt, true, false);
        // Get JSON data
        const data = user.fromJson();
        // Add new user in the database
        const doc = yield userRef.add(data);
        // Get new user data without pass
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
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get id param and data
    const { id } = req.params;
    const _a = req.body, { password, google } = _a, data = __rest(_a, ["password", "google"]);
    try {
        // Obtain the identification document
        let docRef = yield (0, exports.getUser)(id);
        // Verification if there is a user
        if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
            return res.status(400).json({
                msg: 'Error The identification is not already in the database'
            });
        }
        if (password) {
            // Encrypt password
            data.pass = (0, encrypt_pass_1.encryptPass)(password);
        }
        // Fields: identification and status 
        data.identification = docRef === null || docRef === void 0 ? void 0 : docRef.data().identification;
        data.status = true;
        // Update the document with new data
        yield userRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update(data);
        // Get new user data updated
        const resp = yield userRef.where('status', '==', true)
            .where('identification', '==', id).get();
        // Send data
        res.json({
            ok: true,
            user: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: update a user'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: Refactor here
    // Get id param
    const { id } = req.params;
    try {
        // Obtain the identification document
        let docRef = yield (0, exports.getUser)(id);
        // Verification if there is an agent
        if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
            return res.status(400).json({
                msg: 'Error The identification is not already in the database'
            });
        }
        // Update the document with status in false
        yield userRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update({
            status: false
        });
        // Obtain new data 
        const resp = yield userRef.where('status', '==', false)
            .where('identification', '==', id).get();
        const documents = (0, returnDocsFirebase_1.returnDocsFirebase)(resp);
        // Send data
        res.json({
            ok: true,
            user: documents
        });
    }
    catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: delete a user'
        });
    }
});
exports.deleteUser = deleteUser;
const getUser = (id, status = true) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtain all agents with status true / false (param) and id equal
    const resp = yield userRef.where('status', '==', status)
        .where('identification', '==', id).get();
    // From the list obtain documento with id equal
    const docRef = resp.docs.find((doc) => {
        if (doc.data().identification === id) {
            return doc;
        }
    });
    return docRef;
});
exports.getUser = getUser;
//# sourceMappingURL=user.js.map