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
exports.deleteProduct = exports.putProduct = exports.postProduct = exports.getProductById = exports.getProducts = void 0;
// Import db configuration, model and helpers
const config_1 = __importDefault(require("../db/config"));
const product_1 = __importDefault(require("../models/product"));
const returnDocsFirebase_1 = require("../helpers/returnDocsFirebase");
// Reference to collection of agents in firebase
const productRef = config_1.default.collection('products');
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID } = req.params;
    const { limit = 10, from = 1 } = req.query;
    try {
        // Get all data to the limit
        const data = yield productRef
            .orderBy('code')
            .limit(from)
            .where('userID', '==', userID).get();
        // Verification if docs
        if (from > data.docs.length || data.docs.length == 0) {
            return res.status(200).json({
                ok: true,
                total: 0,
                documents: []
            });
        }
        // Get data with filters
        const resp = yield productRef
            .orderBy('code')
            .limit(limit)
            .startAt(data.docs[from - 1])
            .where('status', '==', true)
            .where('userID', '==', userID).get();
        // Send data
        return res.status(200).json({
            ok: true,
            total: resp.docs.length,
            documents: (0, returnDocsFirebase_1.returnDocsFirebase)(resp)
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get all agents.'
        });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get ID param 
    const { id, userID } = req.params;
    try {
        // Get all agents with status true and id equal
        const resp = yield productRef.where('status', '==', true)
            .where('code', '==', id)
            .where('userID', '==', userID).get();
        // Verification if there are documents
        if (resp.empty) {
            return res.status(404).json({
                msg: 'Product with that ID not found in the database.'
            });
        }
        // Processing collection data
        const documents = (0, returnDocsFirebase_1.returnDocsFirebase)(resp);
        // Send data
        return res.status(200).json({
            ok: true,
            documents
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get a product.'
        });
    }
});
exports.getProductById = getProductById;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get data form JSON
    const { code, title, price, available, userID } = req.body;
    try {
        const product = new product_1.default(code, title, price, available, true, userID);
        const data = product.fromJson();
        const doc = yield productRef.add(data);
        // Send data
        res.status(201).json({
            ok: true,
            uid: doc.id,
            data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when create a product.'
        });
    }
});
exports.postProduct = postProduct;
const putProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get id param and data
    // const { id } = req.params;
    // const { ...data } = req.body;
    try {
        res.status(200).json({
            msg: 'put a product'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when update a product.'
        });
    }
});
exports.putProduct = putProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get id param
    // const { id } = req.params;
    try {
        res.status(200).json({
            msg: 'delete a product'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when delete a product'
        });
    }
});
exports.deleteProduct = deleteProduct;
// export const getAgent = async (id : String, status = true) => {
//     // Obtain all agents with status true / false (param) and id equal
//     const resp = await agentRef.where('status', '==', status)
//                                    .where('identification','==', id).get();
//     // From the list obtain documento with id equal
//     const docRef = resp.docs.find((doc) => {
//         if(doc.data().identification === id){
//             return doc;
//         }
//     });
//     return docRef;
// }
//# sourceMappingURL=products.js.map