"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsValidation = void 0;
const express_validator_1 = require("express-validator");
const fieldsValidation = (req, res, next) => {
    // Catch errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // Send errors
        return res.status(400).json(errors);
    }
    next();
};
exports.fieldsValidation = fieldsValidation;
//# sourceMappingURL=inputs-validation.js.map