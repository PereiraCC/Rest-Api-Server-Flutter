"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports of express
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Imports od controller, helpers and middlewares
const agent_1 = require("../controllers/agent");
const db_validators_1 = require("../helpers/db-validators");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const validation_jwt_1 = require("../middlewares/validation-jwt");
// Instance of router
const router = (0, express_1.Router)();
// Get all agents
router.get('/', [
    (0, express_validator_1.check)('userID', 'The user ID field is required.').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], agent_1.getAgents);
// Get an agent by id
router.get('/:id', [
    validation_jwt_1.validationJWT,
    (0, express_validator_1.check)('id', 'The identification parameter must be numeric.').isNumeric(),
    (0, express_validator_1.check)('userID', 'The user ID field is required.').not().isEmpty(),
    inputs_validation_1.fieldsValidation
], agent_1.getAgentById);
// Create new agent
router.post('/', [
    validation_jwt_1.validationJWT,
    (0, express_validator_1.check)('identification', 'The identification field is required.').not().isEmpty(),
    (0, express_validator_1.check)('identification', 'The identification field must be numeric').isNumeric(),
    // check('identification').custom(inyectionSqlInputs),
    (0, express_validator_1.check)('identification').custom(value => (0, db_validators_1.existsIdentification)(value, 'agents')),
    (0, express_validator_1.check)('name', 'The name field is required.').not().isEmpty(),
    // check('name').custom(inyectionSqlInputs),
    (0, express_validator_1.check)('lastname', 'The last name field is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The email field is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The email field is invalid.').isEmail(),
    (0, express_validator_1.check)('phone', 'The phone field is required.').not().isEmpty(),
    (0, express_validator_1.check)('phone', 'The phone field must be numeric').isNumeric(),
    inputs_validation_1.fieldsValidation
], agent_1.postAgent);
// Update an agent
router.put('/:id', [
    validation_jwt_1.validationJWT,
    (0, express_validator_1.check)('id', 'The identification parameter must be numeric.').isNumeric(),
    (0, express_validator_1.check)('id').custom(value => (0, db_validators_1.existsbyId)(value, 'agents')),
    inputs_validation_1.fieldsValidation
], agent_1.putAgent);
// Delete an agent (Status in false)
router.delete('/:id', [
    validation_jwt_1.validationJWT,
    (0, express_validator_1.check)('id', 'The identification parameter must be numeric.').isNumeric(),
    (0, express_validator_1.check)('id').custom(value => (0, db_validators_1.existsbyId)(value, 'agents')),
    inputs_validation_1.fieldsValidation
], agent_1.deleteAgent);
exports.default = router;
//# sourceMappingURL=agent.js.map