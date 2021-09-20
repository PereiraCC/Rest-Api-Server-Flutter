"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_1 = require("../controllers/agent");
const router = (0, express_1.Router)();
router.get('/', agent_1.getAgents);
router.get('/:id', agent_1.getAgentById);
router.post('/', agent_1.postAgent);
router.put('/:id', agent_1.putAgent);
router.delete('/:id', agent_1.deleteAgent);
exports.default = router;
//# sourceMappingURL=agent.js.map