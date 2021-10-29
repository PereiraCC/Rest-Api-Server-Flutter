// Imports of express
import { Router } from "express";
import { check } from "express-validator";

// Imports od controller, helpers and middlewares
import { deleteAgent, getAgentById, getAgents, postAgent, putAgent } from "../controllers/agent";
import { existsbyId, existsIdentification, existsIDFirebase } from "../helpers/db-validators";
import { fieldsValidation } from "../middlewares/inputs-validation";
import { validationJWT } from "../middlewares/validation-jwt";

// Instance of router
const router = Router();

// Get all agents
router.get('/:userID', [
    check('userID', 'The user ID field is required.').not().isEmpty(),
    fieldsValidation
], getAgents);

// Get an agent by id
router.get('/:userID/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('userID', 'The user ID field is required.').not().isEmpty(),
    fieldsValidation
], getAgentById );

// Create new agent
router.post('/', [
    validationJWT,
    check('identification','The identification field is required.').not().isEmpty(),
    check('identification', 'The identification field must be numeric').isNumeric(),
    check('identification').custom( value => existsIdentification(value, 'agents', 'identification')),
    check('name','The name field is required.').not().isEmpty(),
    check('lastname','The last name field is required.').not().isEmpty(),
    check('email','The email field is required.').not().isEmpty(),
    check('email','The email field is invalid.').isEmail(),
    check('phone','The phone field is required.').not().isEmpty(),
    check('phone', 'The phone field must be numeric').isNumeric(),
    check('userID', 'The user ID field is required.').not().isEmpty(),
    check('userID').custom( value => existsIDFirebase(value, 'users')),
    fieldsValidation
], postAgent);

// Update an agent
router.put('/:userID/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom(value => existsbyId(value, 'agents', 'identification')),
    check('userID', 'The userID field is required.').not().isEmpty(),
    check('userID').custom( value => existsIDFirebase(value, 'users')),
    fieldsValidation
], putAgent );

// Delete an agent (Status in false)
router.delete('/:userID/:id', [
    validationJWT,
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom(value => existsbyId(value, 'agents', 'identification')),
    check('userID', 'The userID field is required.').not().isEmpty(),
    check('userID').custom( value => existsIDFirebase(value, 'users')),
    fieldsValidation
], deleteAgent );



export default router;