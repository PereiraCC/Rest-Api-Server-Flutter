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
exports.deleteAgent = exports.putAgent = exports.postAgent = exports.getAgentById = exports.getAgents = void 0;
const config_1 = __importDefault(require("../db/config"));
const agent_1 = __importDefault(require("../models/agent"));
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
const agentRef = config_1.default.collection('agents');
const getAgents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resp = yield agentRef.where('status', '==', true).get();
        const documents = (0, returnDocsFirebase_1.returnDocsFirebase)(resp);
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
    const { id } = req.params;
    try {
        const resp = yield agentRef.where('status', '==', true)
            .where('identification', '==', id).get();
        if (resp.docs.length == 0) {
            return res.status(404).json({
                msg: 'Agent with that ID not found in the database.'
            });
        }
        const documents = (0, returnDocsFirebase_1.returnDocsFirebase)(resp);
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
    const { identification, name, lastname, email, phone } = req.body;
    try {
        const agent = new agent_1.default(identification, name, lastname, email, phone, true);
        const data = agent.fromJson();
        const doc = yield agentRef.add(data);
        // console.log(doc.id);
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
    const { id } = req.params;
    const data = __rest(req.body, []);
    try {
        let docRef = yield getAgent(id);
        data.identification = docRef === null || docRef === void 0 ? void 0 : docRef.data().identification;
        data.status = true;
        yield agentRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update(data);
        docRef = yield getAgent(id);
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
    const { id } = req.params;
    try {
        let docRef = yield getAgent(id);
        yield agentRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update({
            status: false
        });
        docRef = yield getAgent(id, false);
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
    const resp = yield agentRef.where('status', '==', status)
        .where('identification', '==', id).get();
    const docRef = resp.docs.find((doc) => {
        if (doc.data().identification === id) {
            return doc;
        }
    });
    return docRef;
});
//# sourceMappingURL=agent.js.map