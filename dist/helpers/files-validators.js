"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionValidation = void 0;
const extensionValidation = (fileName = '', extensions = []) => {
    const cutName = fileName.split('.');
    const extension = cutName[cutName.length - 1];
    extensions = extensions.map((e) => e.toUpperCase());
    if (!extensions.includes(extension.toUpperCase())) {
        return false;
    }
    return true;
};
exports.extensionValidation = extensionValidation;
//# sourceMappingURL=files-validators.js.map