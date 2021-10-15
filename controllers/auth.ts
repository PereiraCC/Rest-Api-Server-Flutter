import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import db from '../db/config';
import { generateJWT } from '../helpers/generate-jwt';
import { returnDocsFirebase } from "../helpers/returnDocsFirebase";
import { verify } from "../helpers/google-verify";
import User from "../models/user";

// Reference to collection of users in firebase
const userRef = db.collection('users');

export const login = async (req : Request, res: Response) => {

    // Get data from body
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

        // Get user pass and identification
        const { pass, identification } = resp.docs[0].data(); 

        // Decrypt password
        const validPassword : boolean = bcryptjs.compareSync( password, pass);

        // Verification if correct password
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Incorrect password'
            });
        }

        // create JWT (Json Web Token)
        const token = await generateJWT( identification );

        // Send data
        res.json({
            ok: true,
            token,
            documents : returnDocsFirebase( resp )
        });

    } catch (error) {
        console.log(`Error in login: ${error}`);
        return res.status(500).json({
            msg: 'Error'
        })
    }

}

export const googleSingIn = async (req : Request, res: Response) => {

    // Get id token google
    const { id_token } = req.body;

    try {
        
        // Get user google name, picture, email
        const {name, picture, email} = await verify(id_token);

        // Get all users with email equal
        const resp = await userRef.where('email','==', email).get();

        // Verification if there are documents
        if( resp.docs.length == 0 ){
            
            const resp = await createNewUserGoogle(name || '', email || '', picture || '', id_token);
            return res.status(201).json(resp);

        }

        // Verification user blocked
        if( !resp.docs[0].data().status){
            return res.status(401).json({
                msg: 'User blocked',
            });
        }

        // Generar el JWT
        const token = await generateJWT( id_token );

        // Send data
        return res.json({
            msg :'ok',
            token,
        });

    } catch (error) {
        console.log(`Error in login: ${error}`);
        return res.status(500).json({
            msg: 'Error google sing in method'
        })
    }

}

const createNewUserGoogle = async (name : string, email : string, picture : string, id_token : string) => {

    // Create new instance of agent class
    const user : User = new User('google-id', name || '', email || '', 'no-pass', true, true, picture);

    // Get JSON data
    const data = user.fromJson();

    // Add new user in the database
    const doc = await userRef.add(data);

    // Get new user data without pass and status
    const {pass, status, ...newUser} = data;

    // Create JWT
    const token = await generateJWT( id_token );

    // Send data
    return {
        ok: true,
        uid : doc.id,
        newUser,
        token
    };

}