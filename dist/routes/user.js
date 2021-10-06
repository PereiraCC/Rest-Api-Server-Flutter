"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports of express
const express_1 = require("express");
// import { check } from "express-validator";
// Imports od controller, helpers and middlewares
const user_1 = require("../controllers/user");
// import { existsAgentbyId, existsIdentification, inyectionSqlInputs } from "../helpers/db-validators";
const inputs_validation_1 = require("../middlewares/inputs-validation");
// Instance of router
const router = (0, express_1.Router)();
// Get all users
router.get('/', user_1.getUsers);
// Get a user by id
router.get('/:id', [
    // check('id', 'The identification parameter must be numeric.').isNumeric(),
    inputs_validation_1.fieldsValidation
], user_1.getUserById);
// Create new user
router.post('/', [
    // check('identification','The identification field is required.').not().isEmpty(),
    // check('identification', 'The identification field must be numeric').isNumeric(),
    // // check('identification').custom(inyectionSqlInputs),
    // check('identification').custom(existsIdentification),
    // check('name','The name field is required.').not().isEmpty(),
    // // check('name').custom(inyectionSqlInputs),
    // check('lastname','The last name field is required.').not().isEmpty(),
    // check('email','The email field is required.').not().isEmpty(),
    // check('email','The email field is invalid.').isEmail(),
    // check('phone','The phone field is required.').not().isEmpty(),
    // check('phone', 'The phone field must be numeric').isNumeric(),
    inputs_validation_1.fieldsValidation
], user_1.postUser);
// Update a user
router.put('/:id', [
    // check('id', 'The identification parameter must be numeric.').isNumeric(),
    // check('id').custom(existsAgentbyId),
    inputs_validation_1.fieldsValidation
], user_1.putUser);
// Delete an agent (Status in false)
router.delete('/:id', [
    // check('id', 'The identification parameter must be numeric.').isNumeric(),
    // check('id').custom(existsAgentbyId),
    inputs_validation_1.fieldsValidation
], user_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map