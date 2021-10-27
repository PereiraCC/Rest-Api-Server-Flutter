import { Request, Response } from "express";

// Import db configuration, model and helpers
import db from '../db/config';
import Product from "../models/product";
import { returnDocsFirebase } from "../helpers/returnDocsFirebase";

// Reference to collection of agents in firebase
const productRef = db.collection('products');

export const getProducts = async (req : Request, res : Response) => {
    
    const { userID } = req.params;
    const { limit = 10, from = 1 } = req.query;

    try {
        
        // Get all data to the limit
        const data = await productRef
            .orderBy('code')
            .limit(from as number)
            .where('userID', '==', userID).get();

        // Verification if docs
        if(from as number > data.docs.length || data.docs.length == 0) {
            return res.status(200).json({
                ok: true,
                total : 0,
                documents: []
            });
        }

        // Get data with filters
        const resp = await productRef
            .orderBy('code')
            .limit(limit as number)
            .startAt(data.docs[from as number - 1])
            .where('status', '==', true)
            .where('userID', '==', userID).get();

        // Send data
        return res.status(200).json({
            ok: true,
            total : resp.docs.length,
            documents : returnDocsFirebase(resp)
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get all agents.'
        });
    }

}

export const getProductById = async (req : Request, res : Response) => {

    // Get ID param 
    const { id, userID } = req.params;

    try {

        // Get all agents with status true and id equal
        const resp = await productRef.where('status', '==', true)
                                     .where('code','==', id)
                                     .where('userID', '==', userID).get();

        // Verification if there are documents
        if( resp.empty ){
            return res.status(404).json({
                msg: 'Product with that ID not found in the database.'
            });
        }

        // Processing collection data
        const documents = returnDocsFirebase(resp);

        // Send data
        return res.status(200).json({
            ok: true,
            documents
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when get a product.'
        });
    }
}

export const postProduct = async (req : Request, res : Response) => {

    // Get data form JSON
    const { code, title, price, available, userID } = req.body;

    try {

        const product = new Product(code, title, price, available, true , userID);
        const data = product.fromJson();

        const doc = await productRef.add(data);

        // Send data
        res.status(201).json({
            ok: true,
            uid : doc.id,
            data
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when create a product.'
        });
    }
}

export const putProduct = async (req : Request, res : Response) => {

    // Get id param and data
    const { userID, id } = req.params;
    const { ...data } = req.body;

    try {

       // Obtain the identification document
       let docRef = await getProduct(id, userID);

       // Verification if there is an agent
       if(!docRef?.exists){
           return res.status(400).json({
               msg: 'Error The product is not already in the database'
           }); 
       }

       // Fields: identification and status 
       data.code = docRef?.data().code;
       data.userID = docRef?.data().userID;
       data.status = true;

       // Update the document with new data
       await productRef.doc(docRef?.id).update(data);

       // Obtain the new data
       docRef = await getProduct(id, userID);

       // Send data
       return res.status(200).json({
           ok: true,
           uid : docRef?.id,
           agent : docRef?.data()
       });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when update a product.'
        });
    }
}

export const deleteProduct = async (req : Request, res : Response) => {

    // Get id param
    // const { id } = req.params;

    try {

        res.status(200).json({
            msg: 'delete a product'
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when delete a product'
        });
    }
}

export const getProduct = async (id : string, userID : string ,status : boolean = true) => {

    // Obtain all agents with status true / false (param) and id equal
    const resp = await productRef.where('status', '==', status)
                                 .where('code','==', id)
                                 .where('userID','==', userID).get();

    // From the list obtain documento with id equal
    const docRef = resp.docs.find((doc) => {
        if(doc.data().code === id){
            return doc;
        }
    });

    return docRef;

}