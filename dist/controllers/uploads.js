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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const config_1 = __importDefault(require("../db/config"));
const agent_1 = require("./agent");
const files_validators_1 = require("../helpers/files-validators");
const user_1 = require("../controllers/user");
const upload_image_1 = require("../helpers/upload-image");
const products_1 = require("./products");
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Get params
        const { id, collection } = req.params;
        const { userID = '' } = req.query;
        // Reference to collection of agents in firebase
        let collectionRef;
        let docRef;
        let urlImage;
        let resp;
        switch (collection) {
            case 'agents':
                // Set collection and get data
                collectionRef = config_1.default.collection('agents');
                docRef = yield (0, agent_1.getAgent)(id, userID);
                // Verification id there are documents
                if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
                    return res.status(400).json({
                        msg: 'Error the agent is not already in the database'
                    });
                }
                break;
            case 'users':
                // Set collection and get data
                collectionRef = config_1.default.collection('users');
                docRef = yield (0, user_1.getUser)(id);
                // Verification id there are documents
                if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
                    return res.status(400).json({
                        msg: 'Error the user is not already in the database'
                    });
                }
                break;
            case 'products':
                if (userID === '') {
                    return res.status(400).json({
                        msg: 'Error the userID is required'
                    });
                }
                // Set collection and get data
                collectionRef = config_1.default.collection('products');
                docRef = yield (0, products_1.getProduct)(id, userID);
                // Verification id there are documents
                if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
                    return res.status(400).json({
                        msg: 'Error the product is not already in the database'
                    });
                }
                break;
            default:
                return res.status(500).json({
                    msg: 'Contact the administrator'
                });
        }
        try {
            // Get data of the file
            const { tempFilePath, name } = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
            // Extension validation
            const extension = (0, files_validators_1.extensionValidation)(name, ['png', 'jpg', 'jpeg', 'gif']);
            if (!extension) {
                return res.status(400).json({
                    msg: 'The file extension is not allowed.'
                });
            }
            // Upload image to cloudinary
            if (docRef.data().profile_image) {
                urlImage = yield (0, upload_image_1.uploadImage)(tempFilePath, false, docRef.data().profile_image);
            }
            else {
                urlImage = yield (0, upload_image_1.uploadImage)(tempFilePath);
            }
            // Update data in firebase
            yield collectionRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update({
                profile_image: urlImage
            });
            // Get new data
            switch (collection) {
                case 'agents':
                    resp = yield getDataAgent(id, userID);
                    return res.status(200).json(resp);
                case 'products':
                    resp = yield getDataProduct(id, userID);
                    return res.status(200).json(resp);
                case 'users':
                    docRef = yield (0, user_1.getUser)(id);
                    const _b = docRef === null || docRef === void 0 ? void 0 : docRef.data(), { pass, status } = _b, data = __rest(_b, ["pass", "status"]);
                    return res.status(200).json({
                        ok: true,
                        data
                    });
                default:
                    break;
            }
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
const getDataAgent = (id, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield (0, agent_1.getAgent)(id, userID);
    return {
        ok: true,
        data: docRef === null || docRef === void 0 ? void 0 : docRef.data()
    };
});
const getDataProduct = (id, userID) => __awaiter(void 0, void 0, void 0, function* () {
    const docRef = yield (0, products_1.getProduct)(id, userID);
    return {
        ok: true,
        data: docRef === null || docRef === void 0 ? void 0 : docRef.data()
    };
});
//# sourceMappingURL=uploads.js.map