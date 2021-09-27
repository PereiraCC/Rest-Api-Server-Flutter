// Imports of express
import { Router } from "express";
import { check } from "express-validator";
import { uploadFile } from "../controllers/uploads";
import { fileValidationUpload } from "../middlewares/files-validation";
import { fieldsValidation } from "../middlewares/inputs-validation";

// Imports od controller, helpers and middlewares
// import { deleteAgent, getAgentById, getAgents, postAgent, putAgent } from "../controllers/agent";
import { allowableCollections, existsAgentbyId } from "../helpers/db-validators";
// import { fieldsValidation } from "../middlewares/inputs-validation";

// Instance of router
const router = Router();

// upload profile image of agents
router.put('/:collection/:id', [
    fileValidationUpload,
    check('id').custom(existsAgentbyId),
    check('collection').custom( c => allowableCollections(c, ['agents'])),
    fieldsValidation
], uploadFile);

export default router;