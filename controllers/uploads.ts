import db from '../db/config';
import { Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';

// Configuration of cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

import { getAgent } from './agent';
import { extensionValidation } from '../helpers/files-validators';
import { getUser } from '../controllers/user';

export const uploadFile = async (req : Request, res : Response) => {

    try {

        const { id, collection } = req.params;

        // Reference to collection of agents in firebase
        let collectionRef : any;
        let docRef   : any;

        switch (collection) {

            case 'agents':
                collectionRef = db.collection('agents');
                docRef = await getAgent(id);
                
                if(!docRef?.exists){
                    return res.status(400).json({
                        msg: 'Error the agent is not already in the database'
                    }); 
                }
                break;

            case 'users':
                collectionRef = db.collection('users');
                docRef = await getUser(id);
                
                if(!docRef?.exists){
                    return res.status(400).json({
                        msg: 'Error the user is not already in the database'
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
            const resp: Boolean = extensionValidation(name, ['png', 'jpg', 'jpeg', 'gif']);

            if(!resp){
                return res.status(400).json({
                    msg : 'The file extension is not allowed.'
                });
            }

            if(docRef.data().profile_image){
                console.log('profile image already')
                const nombreArr     = docRef.data().profile_image.split('/');
                const nombre        = nombreArr[ nombreArr.length - 1];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy( public_id );
            }

            const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

            await collectionRef.doc(docRef?.id).update({
                profile_image : secure_url
            });

            if(collection == 'agents'){

                docRef = await getAgent(id);
                return res.status(200).json({
                    ok: true,
                    data : docRef?.data()
                });


            } else {

                docRef = await getUser(id);
                const { pass, status, ...data } = docRef?.data();
                return res.status(200).json({
                    ok: true,
                    data
                });
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