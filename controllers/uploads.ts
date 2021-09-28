import db from '../db/config';
import { Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';

// Reference to collection of agents in firebase
const agentRef = db.collection('agents');

// Configuration of cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

import { getAgent } from './agent';
import { extensionValidation } from '../helpers/files-validators';

export const uploadFile = async (req : Request, res : Response) => {

    try {

        const { id, collection } = req.params;

        let docRef;

        switch (collection) {

            case 'agents':

                docRef = await getAgent(id);
                
                if(!docRef?.exists){
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
            const { tempFilePath, name} = req.files?.file as UploadedFile;
            console.log(tempFilePath);
            const resp: Boolean = extensionValidation(name, ['png', 'jpg', 'jpeg', 'gif']);

            if(!resp){
                return res.status(400).json({
                    msg : 'The file extension is not allowed.'
                });
            }

            if(docRef.data().profile_image){
                const nombreArr     = docRef.data().profile_image.split('/');
                const nombre        = nombreArr[ nombreArr.length - 1];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy( public_id );
            }

            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

            await agentRef.doc(docRef?.id).update({
                profile_image : secure_url
            });

            docRef = await getAgent(id);

            res.status(200).json({
                ok: true,
                data : docRef?.data()
            });

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