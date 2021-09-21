import { Router } from "express";
import { check } from "express-validator";


import { deleteAgent, getAgentById, getAgents, postAgent, putAgent } from "../controllers/agent";
import { existsAgentbyId, existsIdentification, inyectionSqlInputs } from "../helpers/db-validators";
import { fieldsValidation } from "../middlewares/inputs-validation";


const router = Router();

router.get('/', getAgents);

router.get('/:id', [
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    fieldsValidation
], getAgentById );

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

router.put('/:id', [
    check('id', 'The identification parameter must be numeric.').isNumeric(),
    check('id').custom(existsAgentbyId),
    fieldsValidation
], putAgent );

router.delete('/:id', deleteAgent );



export default router;