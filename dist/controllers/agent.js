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
exports.deleteAgent = exports.putAgent = exports.postAgent = exports.getAgentById = exports.getAgents = void 0;
const config_1 = __importDefault(require("../db/config"));
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
const agent_1 = __importDefault(require("../models/agent"));
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
const getAgentById = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'get agents by id',
        id
    });
};
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
const putAgent = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'put an agent by id',
        id,
        body
    });
};
exports.putAgent = putAgent;
const deleteAgent = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'delete an agent by id',
        id
    });
};
exports.deleteAgent = deleteAgent;
//# sourceMappingURL=agent.js.map