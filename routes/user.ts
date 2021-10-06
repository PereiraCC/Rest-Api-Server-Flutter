// Imports of express
import { Router } from "express";
// import { check } from "express-validator";

// Imports od controller, helpers and middlewares
import { getUsers, getUserById, postUser, putUser, deleteUser } from "../controllers/user";
// import { existsAgentbyId, existsIdentification, inyectionSqlInputs } from "../helpers/db-validators";
import { fieldsValidation } from "../middlewares/inputs-validation";

// Instance of router
const router = Router();

// Get all users
router.get('/', getUsers);

// Get a user by id
router.get('/:id', [
    // check('id', 'The identification parameter must be numeric.').isNumeric(),
    fieldsValidation
], getUserById );

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
    fieldsValidation
], postUser);

// Update a user
router.put('/:id', [
    // check('id', 'The identification parameter must be numeric.').isNumeric(),
    // check('id').custom(existsAgentbyId),
    fieldsValidation
], putUser );

// Delete an agent (Status in false)
router.delete('/:id', [
    // check('id', 'The identification parameter must be numeric.').isNumeric(),
    // check('id').custom(existsAgentbyId),
    fieldsValidation
], deleteUser );



export default router;