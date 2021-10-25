import { Request, Response } from "express";

// Import db configuration, model and helpers
// import db from '../db/config';
// import Agent from "../models/agent";
// import { returnDocsFirebase } from "../helpers/returnDocsFirebase";

// Reference to collection of agents in firebase
// const agentRef = db.collection('agents');

export const getProducts = async (req : Request, res : Response) => {

    try {

        res.status(200).json({
            msg: 'get all products'
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
    // const { id, userID } = req.params;

    try {

        res.status(200).json({
            msg: 'get a product',
            // id, userID
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
    // const { identification, name, lastname, email, phone, userID } = req.body;

    try {

        res.status(200).json({
            msg: 'create a product'
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
    // const { id } = req.params;
    // const { ...data } = req.body;

    try {

        res.status(200).json({
            msg: 'put a product'
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