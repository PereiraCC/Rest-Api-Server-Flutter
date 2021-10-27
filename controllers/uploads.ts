import db from '../db/config';
import { Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';


import { getAgent } from './agent';
import { extensionValidation } from '../helpers/files-validators';
import { getUser } from '../controllers/user';
import { uploadImage } from '../helpers/upload-image';
import { getProduct } from './products';

export const uploadFile = async (req : Request, res : Response) => {

    try {

        // Get params
        const { id, collection } = req.params;
        const { userID = '' }  = req.query;

        // Reference to collection of agents in firebase
        let collectionRef : any;
        let docRef   : any;
        let urlImage : string;
        let resp   : any;

        switch (collection) {

            case 'agents':
                // Set collection and get data
                collectionRef = db.collection('agents');
                docRef = await getAgent(id);
                
                // Verification id there are documents
                if(!docRef?.exists){
                    return res.status(400).json({
                        msg: 'Error the agent is not already in the database'
                    }); 
                }
                break;

            case 'users':
                // Set collection and get data
                collectionRef = db.collection('users');
                docRef = await getUser(id);
                
                // Verification id there are documents
                if(!docRef?.exists){
                    return res.status(400).json({
                        msg: 'Error the user is not already in the database'
                    }); 
                }
                break;

            case 'products':

                if(userID === ''){
                    return res.status(400).json({
                        msg: 'Error the userID is required'
                    });
                }

                // Set collection and get data
                collectionRef = db.collection('products');
                docRef = await getProduct(id, userID as string);
                
                // Verification id there are documents
                if(!docRef?.exists){
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
            const { tempFilePath, name} = req.files?.file as UploadedFile;

            // Extension validation
            const extension : Boolean = extensionValidation(name, ['png', 'jpg', 'jpeg', 'gif']);

            if(!extension){
                return res.status(400).json({
                    msg : 'The file extension is not allowed.'
                });
            }

            // Upload image to cloudinary
            if(docRef.data().profile_image){
                urlImage = await uploadImage(tempFilePath, false, docRef.data().profile_image);
            } else {
                urlImage = await uploadImage(tempFilePath);
            }


            // Update data in firebase
            await collectionRef.doc(docRef?.id).update({
                profile_image : urlImage
            });

            // Get new data
            switch (collection) {
                case 'agents':
                    resp = await getDataAgent(id);
                    return res.status(200).json(resp);

                case 'products':
                    resp = await getDataProduct(id, userID as string);
                    return res.status(200).json(resp);

                case 'users':
                    docRef = await getUser(id);
                    const { pass, status, ...data } = docRef?.data();
                    return res.status(200).json({
                        ok: true,
                        data
                    });
            
                default:
                    break;
            }

        } catch (error) {
            console.log(error);
            return res.status(400).json({
                msg : 'Error uploading file to server'
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msg: 'Error when upload a file.'
        });
    }
}

const getDataAgent = async (id : string) => {

    const docRef = await getAgent(id);
    return {
        ok: true,
        data : docRef?.data()
    };
}

const getDataProduct = async (id : string, userID : string) => {

    const docRef = await getProduct(id, userID);
    return {
        ok: true,
        data : docRef?.data()
    };
}
