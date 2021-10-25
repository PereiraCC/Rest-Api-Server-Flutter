"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports of express
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Imports od controller, helpers and middlewares
const user_1 = require("../controllers/user");
const db_validators_1 = require("../helpers/db-validators");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const validation_jwt_1 = require("../middlewares/validation-jwt");
// Instance of router
const router = (0, express_1.Router)();
// Get all users
router.get('/', user_1.getUsers);
// Get a user by id
router.get('/:id', [
    validation_jwt_1.validationJWT,
    (0, express_validator_1.check)('id', 'The identification parameter must be numeric.').isNumeric(),
    inputs_validation_1.fieldsValidation
], user_1.getUserById);
// Create new user
router.post('/', [
    (0, express_validator_1.check)('identification', 'The identification field is required.').not().isEmpty(),
    (0, express_validator_1.check)('identification', 'The identification field must be numeric').isNumeric(),
    (0, express_validator_1.check)('identification').custom(value => (0, db_validators_1.existsIdentification)(value, 'users', 'identification')),
    (0, express_validator_1.check)('name', 'The name field is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The email field is required.').not().isEmpty(),
    (0, express_validator_1.check)('email', 'The email field is invalid.').isEmail(),
    (0, express_validator_1.check)('password', 'The password field is required.').not().isEmpty(),
    (0, express_validator_1.check)('password').custom(db_validators_1.lenghtPassword),
    inputs_validation_1.fieldsValidation
], user_1.postUser);
// Update a user
router.put('/:id', [
    validation_jwt_1.validationJWT,
    (0, express_validator_1.check)('id', 'The identification parameter must be numeric.').isNumeric(),
    (0, express_validator_1.check)('id').custom(value => (0, db_validators_1.existsbyId)(value, 'users', 'identification')),
    inputs_validation_1.fieldsValidation
], user_1.putUser);
// Delete an agent (Status in false)
router.delete('/:id', [
    validation_jwt_1.validationJWT,
    (0, express_validator_1.check)('id', 'The identification parameter must be numeric.').isNumeric(),
    (0, express_validator_1.check)('id').custom(value => (0, db_validators_1.existsbyId)(value, 'users', 'identification')),
    inputs_validation_1.fieldsValidation
], user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map