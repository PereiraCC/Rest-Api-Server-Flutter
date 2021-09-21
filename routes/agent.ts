import { Router } from "express";
import { check } from "express-validator";


import { deleteAgent, getAgentById, getAgents, postAgent, putAgent } from "../controllers/agent";
import { fieldsValidation } from "../middlewares/inputs-validation";


const router = Router();

router.get('/', getAgents);

router.get('/:id', getAgentById );

router.post('/', [
    check('identification','The identification field is required.').not().isEmpty(),
    // check('identification', 'The identification field must be numeric').isNumeric(),
    // TODO: Validation: if identification exists and injection sql over identification field
    check('name','The name field is required.').not().isEmpty(),
    check('lastname','The last name field is required.').not().isEmpty(),
    check('email','The email field is required.').not().isEmpty(),
    check('phone','The phone field is required.').not().isEmpty(),
    fieldsValidation
], postAgent);

router.put(   '/:id', putAgent );

router.delete('/:id', deleteAgent );



export default router;