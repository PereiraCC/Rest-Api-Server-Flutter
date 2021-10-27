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
exports.getProduct = exports.deleteProduct = exports.putProduct = exports.postProduct = exports.getProductById = exports.getProducts = void 0;
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
    const { userID, id } = req.params;
    const data = __rest(req.body, []);
    try {
        // Obtain the identification document
        let docRef = yield (0, exports.getProduct)(id, userID);
        // Verification if there is an agent
        if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
            return res.status(400).json({
                msg: 'Error The product is not already in the database'
            });
        }
        // Fields: identification and status 
        data.code = docRef === null || docRef === void 0 ? void 0 : docRef.data().code;
        data.userID = docRef === null || docRef === void 0 ? void 0 : docRef.data().userID;
        data.status = true;
        // Update the document with new data
        yield productRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update(data);
        // Obtain the new data
        docRef = yield (0, exports.getProduct)(id, userID);
        // Send data
        return res.status(200).json({
            ok: true,
            uid: docRef === null || docRef === void 0 ? void 0 : docRef.id,
            agent: docRef === null || docRef === void 0 ? void 0 : docRef.data()
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
    const { userID, id } = req.params;
    try {
        // Obtain the identification document
        let docRef = yield (0, exports.getProduct)(id, userID);
        // Verification if there is an agent
        if (!(docRef === null || docRef === void 0 ? void 0 : docRef.exists)) {
            return res.status(400).json({
                msg: 'Error The product is not already in the database'
            });
        }
        // Update the document with new data
        yield productRef.doc(docRef === null || docRef === void 0 ? void 0 : docRef.id).update({ status: false });
        // Obtain the new data
        docRef = yield (0, exports.getProduct)(id, userID, false);
        // Send data
        return res.status(200).json({
            ok: true,
            uid: docRef === null || docRef === void 0 ? void 0 : docRef.id,
            agent: docRef === null || docRef === void 0 ? void 0 : docRef.data()
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
const getProduct = (id, userID, status = true) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtain all products with status true / false (param) and id equal
    const resp = yield productRef.where('status', '==', status)
        .where('code', '==', id)
        .where('userID', '==', userID).get();
    // From the list obtain documento with id equal
    const docRef = resp.docs.find((doc) => {
        if (doc.data().code === id) {
            return doc;
        }
    });
    return docRef;
});
exports.getProduct = getProduct;
//# sourceMappingURL=products.js.map