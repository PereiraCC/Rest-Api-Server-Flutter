// Imports of express
import { Router } from "express";
import { check } from "express-validator";

// Imports of controller, helpers and middlewares
import { uploadFile } from "../controllers/uploads";
import { fileValidationUpload } from "../middlewares/files-validation";
import { fieldsValidation } from "../middlewares/inputs-validation";
import { allowableCollections } from "../helpers/db-validators";
import { validationJWT } from "../middlewares/validation-jwt";

// Instance of router
const router = Router();

// upload profile image of agents
router.put('/:collection/:id', [
    validationJWT,
    fileValidationUpload,
    check('id', 'The id parameter is not numeric').isNumeric(),
    check('collection').custom( c => allowableCollections(c, ['agents', 'users', 'products'])),
    fieldsValidation
], uploadFile);

export default router;