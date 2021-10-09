// Imports of express
import { Router } from "express";
import { check } from "express-validator";

// Imports od controller, helpers and middlewares
import { getUsers, getUserById, postUser, putUser, deleteUser } from "../controllers/user";
import { existsIdentificationUser, lenghtPassword, existsUserbyId } from '../helpers/db-validators';
import { fieldsValidation } from "../middlewares/inputs-validation";
import { validationJWT } from '../middlewares/validation-jwt';

// Instance of router
const router = Router();

// Get all users
router.get('/', getUsers);

// Get a user by id
router.get('/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    fieldsValidation
], getUserById );

// Create new user
router.post('/', [
    check('identification','The identification field is required.').not().isEmpty(),
    check('identification', 'The identification field must be numeric').isNumeric(),
    check('identification').custom( existsIdentificationUser ),
    check('name','The name field is required.').not().isEmpty(),
    check('email','The email field is required.').not().isEmpty(),
    check('email','The email field is invalid.').isEmail(),
    check('password','The password field is required.').not().isEmpty(),
    check('password').custom( lenghtPassword ),
    fieldsValidation
], postUser);

// Update a user
router.put('/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom( existsUserbyId ),
    fieldsValidation
], putUser );

// Delete an agent (Status in false)
router.delete('/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom( existsUserbyId ),
    fieldsValidation
], deleteUser );



export default router;