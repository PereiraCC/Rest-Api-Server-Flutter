// Imports of express
import { Router } from "express";
import { check } from "express-validator";

// Imports od controller, helpers and middlewares
import { googleSingIn, login, validJWT } from "../controllers/auth";
import { lenghtPassword } from "../helpers/db-validators";
import { fieldsValidation } from "../middlewares/inputs-validation";

// Instance of router
const router = Router();

// login manual
router.post('/login', [
    check('email','The email is required').isEmail(),
    check('password','The password is required').not().isEmpty(),
    check('password').custom( lenghtPassword ),
    fieldsValidation
], login );

// sing in Google
router.post('/google', [
    check('id_token', 'The google token is required').not().isEmpty(),
    fieldsValidation
], googleSingIn);

router.post('/validJWT', [
    check('token', 'The token is required').not().isEmpty(),
    fieldsValidation
], validJWT);

export default router;