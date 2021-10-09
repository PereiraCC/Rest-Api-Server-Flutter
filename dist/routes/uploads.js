"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports of express
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// Imports of controller, helpers and middlewares
const uploads_1 = require("../controllers/uploads");
const files_validation_1 = require("../middlewares/files-validation");
const inputs_validation_1 = require("../middlewares/inputs-validation");
const db_validators_1 = require("../helpers/db-validators");
const validation_jwt_1 = require("../middlewares/validation-jwt");
// Instance of router
const router = (0, express_1.Router)();
// upload profile image of agents
router.put('/:collection/:id', [
    validation_jwt_1.validationJWT,
    files_validation_1.fileValidationUpload,
    (0, express_validator_1.check)('id', 'The id parameter is not numeric').isNumeric(),
    (0, express_validator_1.check)('collection').custom(c => (0, db_validators_1.allowableCollections)(c, ['agents', 'users'])),
    inputs_validation_1.fieldsValidation
], uploads_1.uploadFile);
exports.default = router;
//# sourceMappingURL=uploads.js.map