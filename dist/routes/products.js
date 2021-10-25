"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports of express
const express_1 = require("express");
// import { check } from "express-validator";
// Imports od controller, helpers and middlewares
const products_1 = require("../controllers/products");
// import { existsbyId, existsIdentification, inyectionSqlInputs } from "../helpers/db-validators";
// import { fieldsValidation } from "../middlewares/inputs-validation";
// import { validationJWT } from "../middlewares/validation-jwt";
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
// validationJWT,
// check('identification','The identification field is required.').not().isEmpty(),
// check('identification', 'The identification field must be numeric').isNumeric(),
// // check('identification').custom(inyectionSqlInputs),
// check('identification').custom( value => existsIdentification(value, 'agents')),
// check('name','The name field is required.').not().isEmpty(),
// // check('name').custom(inyectionSqlInputs),
// check('lastname','The last name field is required.').not().isEmpty(),
// check('email','The email field is required.').not().isEmpty(),
// check('email','The email field is invalid.').isEmail(),
// check('phone','The phone field is required.').not().isEmpty(),
// check('phone', 'The phone field must be numeric').isNumeric(),
// fieldsValidation
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