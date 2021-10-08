import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import db from '../db/config';
import { generateJWT } from "../helpers/generate-jwt";
import { returnDocsFirebase } from "../helpers/returnDocsFirebase";

// Reference to collection of users in firebase
const userRef = db.collection('users');

export const login = async (req : Request, res: Response) => {

    const { email, password } = req.body;

    try {
        
         // Get all users with status true and email equal
        const resp = await userRef.where('status', '==', true)
                                  .where('email','==', email).get();

        // Verification if there are documents
        if( resp.docs.length == 0 ){
            return res.status(404).json({
                msg: 'User not found in the database.'
            });
        }

        const { pass, identification } = resp.docs[0].data(); 
        const validPassword : boolean = bcryptjs.compareSync( password, pass);
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Incorrect password'
            });
        }

        // create JWT
        const token = await generateJWT( identification );

        const documents = returnDocsFirebase( resp );

        res.json({
            ok: true,
            token,
            documents
        });

    } catch (error) {
        console.log(`Error in login: ${error}`);
        return res.status(500).json({
            msg: 'Error'
        })
    }

}

export const googleSingIn = async (req : Request, res: Response) => {

    try {
        
        res.json({
            msg: 'googleSingIn method'
        });

    } catch (error) {
        console.log(`Error in login: ${error}`);
        return res.status(500).json({
            msg: 'Error'
        })
    }

}