// Imports of express
import { Router } from "express";
import { check } from "express-validator";

// Imports od controller, helpers and middlewares
import { getProducts, getProductById, postProduct, putProduct, deleteProduct } from "../controllers/products";
import { existsbyId, existsIdentification, existsIDFirebase } from "../helpers/db-validators";
import { fieldsValidation } from "../middlewares/inputs-validation";
import { validationJWT } from "../middlewares/validation-jwt";

// Instance of router
const router = Router();

// Get all agents
router.get('/:userID', [
    check('userID', 'The user ID field is required.').not().isEmpty(),
    check('userID').custom( value => existsIDFirebase(value, 'users')),
    fieldsValidation
], getProducts);

// Get an agent by id
router.get('/:userID/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('userID', 'The user ID field is required.').not().isEmpty(),
    check('userID').custom( value => existsIDFirebase(value, 'users')),
    fieldsValidation
], getProductById );

// Create new agent
router.post('/', [
    validationJWT,
    check('code', 'The code field is required.').not().isEmpty(),
    check('code', 'The code field must be numeric').isNumeric(),
    check('code').custom( value => existsIdentification(value, 'products', 'code')),
    check('title', 'The title field is required.').not().isEmpty(),
    check('price', 'The price field is required.').not().isEmpty(),
    check('price', 'The price field must be numeric').isNumeric(),
    check('available', 'The available field is required.').not().isEmpty(),
    check('available', 'The available field is invalid.').isBoolean(),
    check('userID', 'The userID field is required.').not().isEmpty(),
    check('userID').custom( value => existsIDFirebase(value, 'users')),
    fieldsValidation
], postProduct);

// Update an agent
router.put('/:userID/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom(value => existsbyId(value, 'products', 'code')),
    check('userID', 'The userID field is required.').not().isEmpty(),
    check('userID').custom( value => existsIDFirebase(value, 'users')),
    fieldsValidation
], putProduct );

// Delete an agent (Status in false)
router.delete('/:userID/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom(value => existsbyId(value, 'products', 'code')),
    check('userID', 'The userID field is required.').not().isEmpty(),
    check('userID').custom( value => existsIDFirebase(value, 'users')),
    fieldsValidation
], deleteProduct );


export default router;