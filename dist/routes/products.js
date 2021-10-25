"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports of express
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Imports od controller, helpers and middlewares
const products_1 = require("../controllers/products");
const db_validators_1 = require("../helpers/db-validators");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const validation_jwt_1 = require("../middlewares/validation-jwt");
// Instance of router
const router = (0, express_1.Router)();
// Get all agents
router.get('/:userID', [
// check('userID', 'The user ID field is required.').not().isEmpty(),
// fieldsValidation
], products_1.getProducts);
// Get an agent by id
router.get('/:userID/:id', [
// validationJWT,
// check('id', 'The identification parameter must be numeric.').isNumeric(),
// check('userID', 'The user ID field is required.').not().isEmpty(),
// fieldsValidation
], products_1.getProductById);
// Create new agent
router.post('/', [
    validation_jwt_1.validationJWT,
    (0, express_validator_1.check)('code', 'The code field is required.').not().isEmpty(),
    (0, express_validator_1.check)('code', 'The code field must be numeric').isNumeric(),
    (0, express_validator_1.check)('code').custom(value => (0, db_validators_1.existsIdentification)(value, 'products', 'code')),
    (0, express_validator_1.check)('title', 'The title field is required.').not().isEmpty(),
    (0, express_validator_1.check)('price', 'The price field is required.').not().isEmpty(),
    (0, express_validator_1.check)('price', 'The price field must be numeric').isNumeric(),
    (0, express_validator_1.check)('available', 'The available field is required.').not().isEmpty(),
    (0, express_validator_1.check)('available', 'The available field is invalid.').isBoolean(),
    (0, express_validator_1.check)('userID', 'The userID field is required.').not().isEmpty(),
    (0, express_validator_1.check)('userID').custom(value => (0, db_validators_1.existsIDFirebase)(value, 'users')),
    inputs_validation_1.fieldsValidation
], products_1.postProduct);
// Update an agent
router.put('/:id', [
// validationJWT,
// check('id', 'The identification parameter must be numeric.').isNumeric(),
// check('id').custom(value => existsbyId(value, 'agents')),
// fieldsValidation
], products_1.putProduct);
// Delete an agent (Status in false)
router.delete('/:id', [
// validationJWT,
// check('id', 'The identification parameter must be numeric.').isNumeric(),
// check('id').custom(value => existsbyId(value, 'agents')),
// fieldsValidation
], products_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.js.map