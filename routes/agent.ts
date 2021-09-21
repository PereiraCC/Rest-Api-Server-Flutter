// Imports of express
import { Router } from "express";
import { check } from "express-validator";

// Imports od controller, helpers and middlewares
import { deleteAgent, getAgentById, getAgents, postAgent, putAgent } from "../controllers/agent";
import { existsAgentbyId, existsIdentification, inyectionSqlInputs } from "../helpers/db-validators";
import { fieldsValidation } from "../middlewares/inputs-validation";

// Instance of router
const router = Router();

// Get all agents
router.get('/', getAgents);

// Get an agent by id
router.get('/:id', [
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    fieldsValidation
], getAgentById );

// Create new agent
router.post('/', [
    check('identification','The identification field is required.').not().isEmpty(),
    check('identification', 'The identification field must be numeric').isNumeric(),
    // check('identification').custom(inyectionSqlInputs),
    check('identification').custom(existsIdentification),
    check('name','The name field is required.').not().isEmpty(),
    // check('name').custom(inyectionSqlInputs),
    check('lastname','The last name field is required.').not().isEmpty(),
    check('email','The email field is required.').not().isEmpty(),
    check('email','The email field is invalid.').isEmail(),
    check('phone','The phone field is required.').not().isEmpty(),
    check('phone', 'The phone field must be numeric').isNumeric(),
    fieldsValidation
], postAgent);

// Update an agent
router.put('/:id', [
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom(existsAgentbyId),
    fieldsValidation
], putAgent );

// Delete an agent (Status in false)
router.delete('/:id', [
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom(existsAgentbyId),
    fieldsValidation
], deleteAgent );



export default router;