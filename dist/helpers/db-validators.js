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
exports.lenghtPassword = exports.allowableCollections = exports.existsbyId = exports.existsIdentification = exports.inyectionSqlInputs = void 0;
const config_1 = __importDefault(require("../db/config"));
const inyectionSqlInputs = (data) => {
    if (data.toUpperCase().includes('SELECT') || data.toUpperCase().includes('DELETE') ||
        data.toUpperCase().includes('UPDATE') || data.toUpperCase().includes('INSERT')) {
        throw new Error('Error: Invalid data');
    }
};
exports.inyectionSqlInputs = inyectionSqlInputs;
const existsIdentification = (id, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const documRef = config_1.default.collection(collection);
    // Get data from database with id equal
    const resp = yield documRef.where('identification', '==', id).get();
    // check for documents
    if (resp.docs.length > 0) {
        throw new Error('Error: The identification is already in the database');
    }
});
exports.existsIdentification = existsIdentification;
const existsbyId = (id, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const documRef = config_1.default.collection(collection);
    // Obtain all agents with id equal
    const resp = yield documRef.where('identification', '==', id).get();
    // Check for documents
    if (resp.docs.length == 0) {
        throw new Error('Error: The identification is not already in the database');
    }
});
exports.existsbyId = existsbyId;
const allowableCollections = (collection = '', collections = []) => {
    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`The collection: ${collection} is not allowed, Collections: ${collections}`);
    }
    return true;
};
exports.allowableCollections = allowableCollections;
const lenghtPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    if (password.length < 6) {
        throw new Error(`Error: Password must be longer than 6 characters`);
    }
});
exports.lenghtPassword = lenghtPassword;
//# sourceMappingURL=db-validators.js.map