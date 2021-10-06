// Imports of express
import { Router } from "express";
import { check } from "express-validator";

// Imports od controller, helpers and middlewares
import { googleSingIn, login } from "../controllers/auth";
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
router.post('/google', googleSingIn);

export default router;