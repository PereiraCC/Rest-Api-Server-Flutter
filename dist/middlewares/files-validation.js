"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileValidationUpload = void 0;
const fileValidationUpload = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            msg: 'No files for upload'
        });
    }
    next();
};
exports.fileValidationUpload = fileValidationUpload;
//# sourceMappingURL=files-validation.js.map