"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports of express
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Imports od controller, helpers and middlewares
const auth_1 = require("../controllers/auth");
const db_validators_1 = require("../helpers/db-validators");
const inputs_validation_1 = require("../middlewares/inputs-validation");
// Instance of router
const router = (0, express_1.Router)();
// login manual
router.post('/login', [
    (0, express_validator_1.check)('email', 'The email is required').isEmail(),
    (0, express_validator_1.check)('password', 'The password is required').not().isEmpty(),
    (0, express_validator_1.check)('password').custom(db_validators_1.lenghtPassword),
    inputs_validation_1.fieldsValidation
], auth_1.login);
// sing in Google
router.post('/google', auth_1.googleSingIn);
exports.default = router;
//# sourceMappingURL=auth.js.map