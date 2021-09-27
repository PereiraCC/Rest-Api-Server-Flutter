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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
// import path from 'path';
const config_1 = __importDefault(require("../db/config"));
// import fileUpload from 'express-fileupload';
// Reference to collection of agents in firebase
const agentRef = config_1.default.collection('agents');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const agent_1 = require("./agent");
const files_validators_1 = require("../helpers/files-validators");
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id, collection } = req.params;
        let docRef;
        switch (collection) {
            case 'agents':
                docRef = yield (0, agent_1.getAgent)(id);
                if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
                    return res.status(400).json({
                        msg: 'Error the agent is not already in the database'
                    });
                }
                break;
            default:
                return res.status(500).json({
                    msg: 'Contact the administrator'
                });
        }
        try {
            const { tempFilePath, name } = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
            const resp = (0, files_validators_1.extensionValidation)(name, ['png', 'jpg', 'JPG', 'jpeg', 'gif']);
            if (!resp) {
                return res.status(400).json({
                    msg: 'The file extension is not allowed.'
                });
            }
            if (docRef.data().profile_image) {
                const nombreArr = docRef.data().profile_image.split('/');
                const nombre = nombreArr[nombreArr.length - 1];
                const [public_id] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
            }
            const { secure_url } = yield cloudinary.uploader.upload(tempFilePath);
            yield agentRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update({
                profile_image: secure_url
            });
            docRef = yield (0, agent_1.getAgent)(id);
            res.status(200).json({
                ok: true,
                data: docRef === null || docRef === void 0 ? void 0 : docRef.data()
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                msg: 'Error uploading file to server'
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when upload a file.'
        });
    }
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=uploads.js.map