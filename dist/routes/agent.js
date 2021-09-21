"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const agent_1 = require("../controllers/agent");
const db_validators_1 = require("../helpers/db-validators");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const router = (0, express_1.Router)();
router.get('/', agent_1.getAgents);
router.get('/:id', [
    (0, express_validator_1.check)('id', 'The identification parameter must be numeric.').isNumeric(),
    inputs_validation_1.fieldsValidation
], agent_1.getAgentById);
router.post('/', [
    (0, express_validator_1.check)('identification', 'The identification field is required.').not().isEmpty(),
    (0, express_validator_1.check)('identification', 'The identification field must be numeric').isNumeric(),
    // check('identification').custom(inyectionSqlInputs),
    (0, express_validator_1.check)('identification').custom(db_validators_1.existsIdentification),
    (0, express_validator_1.check)('name', 'The name field is required.').not().isEmpty(),
    // check('name').custom(inyectionSqlInputs),
    (0, express_validator_1.check)('lastname', 'The last name field is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The email field is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The email field is invalid.').isEmail(),
    (0, express_validator_1.check)('phone', 'The phone field is required.').not().isEmpty(),
    (0, express_validator_1.check)('phone', 'The phone field must be numeric').isNumeric(),
    inputs_validation_1.fieldsValidation
], agent_1.postAgent);
router.put('/:id', agent_1.putAgent);
router.delete('/:id', agent_1.deleteAgent);
exports.default = router;
//# sourceMappingURL=agent.js.map