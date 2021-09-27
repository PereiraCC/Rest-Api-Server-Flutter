"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports of express
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const uploads_1 = require("../controllers/uploads");
const files_validation_1 = require("../middlewares/files-validation");
const inputs_validation_1 = require("../middlewares/inputs-validation");
// Imports od controller, helpers and middlewares
// import { deleteAgent, getAgentById, getAgents, postAgent, putAgent } from "../controllers/agent";
const db_validators_1 = require("../helpers/db-validators");
// import { fieldsValidation } from "../middlewares/inputs-validation";
// Instance of router
const router = (0, express_1.Router)();
// upload profile image of agents
router.put('/:collection/:id', [
    files_validation_1.fileValidationUpload,
    (0, express_validator_1.check)('id').custom(db_validators_1.existsAgentbyId),
    (0, express_validator_1.check)('collection').custom(c => (0, db_validators_1.allowableCollections)(c, ['agents'])),
    inputs_validation_1.fieldsValidation
], uploads_1.uploadFile);
exports.default = router;
//# sourceMappingURL=uploads.js.map