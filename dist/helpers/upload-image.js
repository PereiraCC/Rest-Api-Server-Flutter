"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
// Configuration of cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const uploadImage = (tempPath, isNew = true, imagePath = '') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!isNew) {
            const nombreArr = imagePath.split('/');
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }
        const { secure_url } = yield cloudinary.uploader.upload(tempPath);
        return secure_url;
    }
    catch (error) {
        console.log(error);
        throw new Error('Error upload image');
    }
});
exports.uploadImage = uploadImage;
//# sourceMappingURL=upload-image.js.map