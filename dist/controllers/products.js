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
// Reference to collection of agents in firebase
const productRef = config_1.default.collection('products');
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            msg: 'get all products'
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
    // const { id, userID } = req.params;
    try {
        res.status(200).json({
            msg: 'get a product',
            // id, userID
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