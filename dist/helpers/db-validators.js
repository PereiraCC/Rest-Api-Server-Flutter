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
exports.existsAgentbyId = exports.existsIdentification = exports.inyectionSqlInputs = void 0;
const config_1 = __importDefault(require("../db/config"));
// Reference the agents collection in database 
const agentRef = config_1.default.collection('agents');
const inyectionSqlInputs = (data) => {
    if (data.toUpperCase().includes('SELECT') || data.toUpperCase().includes('DELETE') ||
        data.toUpperCase().includes('UPDATE') || data.toUpperCase().includes('INSERT')) {
        throw new Error('Error: Invalid data');
    }
};
exports.inyectionSqlInputs = inyectionSqlInputs;
const existsIdentification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data from database with id equal
    const resp = yield agentRef.where('identification', '==', id).get();
    // resp.docs.forEach((doc) => {
    //     console.log(doc.data());
    // })
    // check for documents
    if (resp.docs.length > 0) {
        throw new Error('Error: The identification is already in the database');
    }
});
exports.existsIdentification = existsIdentification;
const existsAgentbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtain all agents with id equal
    const resp = yield agentRef.where('identification', '==', id).get();
    // Check for documents
    if (resp.docs.length == 0) {
        throw new Error('Error: The identification is not already in the database');
    }
});
exports.existsAgentbyId = existsAgentbyId;
//# sourceMappingURL=db-validators.js.map