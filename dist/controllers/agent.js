"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgent = exports.putAgent = exports.postAgent = exports.getAgentById = exports.getAgents = void 0;
const getAgents = (req, res) => {
    res.json({
        msg: 'get agents'
    });
};
exports.getAgents = getAgents;
const getAgentById = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'get agents by id',
        id
    });
};
exports.getAgentById = getAgentById;
const postAgent = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'post an agent',
        body
    });
};
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