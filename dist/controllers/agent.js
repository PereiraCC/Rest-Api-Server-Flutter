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
exports.getAgent = exports.deleteAgent = exports.putAgent = exports.postAgent = exports.getAgentById = exports.getAgents = void 0;
// Import db configuration, model and helpers
const config_1 = __importDefault(require("../db/config"));
const agent_1 = __importDefault(require("../models/agent"));
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
// Reference to collection of agents in firebase
const agentRef = config_1.default.collection('agents');
const getAgents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all agents with status in true
        const resp = yield agentRef.orderBy('identification')
            .where('status', '==', true).get();
        // Processing collection data
        const documents = (0, returnDocsFirebase_1.returnDocsFirebase)(resp);
        // Send data
        return res.status(200).json({
            ok: true,
            total: documents.length,
            documents
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get all agents.'
        });
    }
});
exports.getAgents = getAgents;
const getAgentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get ID param 
    const { id } = req.params;
    try {
        // Get all agents with status true and id equal
        const resp = yield agentRef.where('status', '==', true)
            .where('identification', '==', id).get();
        // Verification if there are documents
        if (resp.docs.length == 0) {
            return res.status(404).json({
                msg: 'Agent with that ID not found in the database.'
            });
        }
        // Processing collection data
        const documents = (0, returnDocsFirebase_1.returnDocsFirebase)(resp);
        // Send data
        return res.status(200).json({
            ok: true,
            documents
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get an agent.'
        });
    }
});
exports.getAgentById = getAgentById;
const postAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data form JSON
    const { identification, name, lastname, email, phone } = req.body;
    try {
        // Create new instance of agent class and get JSON
        const agent = new agent_1.default(identification, name, lastname, email, phone, true);
        const data = agent.fromJson();
        // Add new agent in the database
        const doc = yield agentRef.add(data);
        // console.log(doc.id);
        // Send data
        res.status(201).json({
            ok: true,
            id_agent: doc.id,
            data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when creating an agent.'
        });
    }
});
exports.postAgent = postAgent;
const putAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get id param and data
    const { id } = req.params;
    const data = __rest(req.body, []);
    try {
        // Obtain the identification document
        let docRef = yield (0, exports.getAgent)(id);
        // Verification if there is an agent
        if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
            return res.status(400).json({
                msg: 'Error The identification is not already in the database'
            });
        }
        // Fields: identification and status 
        data.identification = docRef === null || docRef === void 0 ? void 0 : docRef.data().identification;
        data.status = true;
        // Update the document with new data
        yield agentRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update(data);
        // Obtain the new data
        docRef = yield (0, exports.getAgent)(id);
        // Send data
        res.json({
            ok: true,
            id_agent: docRef === null || docRef === void 0 ? void 0 : docRef.id,
            agent: docRef === null || docRef === void 0 ? void 0 : docRef.data()
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when updating an agent.'
        });
    }
});
exports.putAgent = putAgent;
const deleteAgent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get id param
    const { id } = req.params;
    try {
        // Obtain the identification document
        let docRef = yield (0, exports.getAgent)(id);
        // Verification if there is an agent
        if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
            return res.status(400).json({
                msg: 'Error The identification is not already in the database'
            });
        }
        // Update the documento with status in false
        yield agentRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update({
            status: false
        });
        // Obtain new data 
        docRef = yield (0, exports.getAgent)(id, false);
        // Send data
        res.json({
            ok: true,
            id_agent: docRef === null || docRef === void 0 ? void 0 : docRef.id,
            agent: docRef === null || docRef === void 0 ? void 0 : docRef.data()
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when deleting an agent.'
        });
    }
});
exports.deleteAgent = deleteAgent;
const getAgent = (id, status = true) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtain all agents with status true / false (param) and id equal
    const resp = yield agentRef.where('status', '==', status)
        .where('identification', '==', id).get();
    // From the list obtain documento with id equal
    const docRef = resp.docs.find((doc) => {
        if (doc.data().identification === id) {
            return doc;
        }
    });
    return docRef;
});
exports.getAgent = getAgent;
//# sourceMappingURL=agent.js.map