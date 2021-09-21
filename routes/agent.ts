import { Router } from "express";
import { check } from "express-validator";


import { deleteAgent, getAgentById, getAgents, postAgent, putAgent } from "../controllers/agent";
import { existsIdentification, inyectionSqlInputs } from "../helpers/db-validators";
import { fieldsValidation } from "../middlewares/inputs-validation";


const router = Router();

router.get('/', getAgents);

router.get('/:id', getAgentById );

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

router.put(   '/:id', putAgent );

router.delete('/:id', deleteAgent );



export default router;