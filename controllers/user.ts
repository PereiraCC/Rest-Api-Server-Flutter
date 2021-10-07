import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import db from '../db/config';
import User from "../models/user";
import { returnDocsFirebase } from "../helpers/returnDocsFirebase";

// Reference to collection of users in firebase
const userRef = db.collection('users');

export const getUsers = async (req : Request, res : Response) => {

    const { limit = 10, from = 1} = req.query;

    try {

        const data = await userRef
            .orderBy("identification")
            .limit(limit as number).get();

        if(from as number > data.docs.length || data.docs.length == 0) {
            return res.status(200).json({
                ok: true,
                total : 0,
                documents: []
            });
        }

        const fromNumber : number = from as number;

        const resp = await userRef
            .orderBy("identification")
            .limit(limit as number)
            .startAt(data.docs[fromNumber - 1])
            .where('status', '==', true).get();

        const documents = returnDocsFirebase(resp);

        // Send data
        return res.status(200).json({
            ok: true,
            total : documents.length,
            documents
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: Get all users'
        });
    }

}

export const getUserById = async (req : Request, res : Response) => {

    try {
        
        const { id } = req.params;

        // Get all users with status true and id equal
        const resp = await userRef.where('status', '==', true)
                                   .where('identification','==', id).get();

        // Verification if there are documents
        if( resp.docs.length == 0 ){
            return res.status(404).json({
                msg: 'User with that ID not found in the database.'
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
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: Get a user'
        });
    }

}

export const postUser = async (req : Request, res : Response) => {
    
    // Get data from body
    const {identification , name , email, password } 
        : {identification : string, name : string, email : string, password : string} = req.body;

    try {
        
        // Encrypt password
        const salt : string = bcryptjs.genSaltSync();
        const encryptPass : string = bcryptjs.hashSync(password, salt)
        
        // Create new instance of agent class
        const user : User = new User(identification, name, email, encryptPass, true, false);

        // Get JSON data
        const data = user.fromJson();

        // Add new agent in the database
        const doc = await userRef.add(data);

        const {pass, ...newUser} = data;
        // Send data
        res.status(201).json({
            ok: true,
            id_user : doc.id,
            newUser
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: create a user'
        });
    }

}

export const putUser = async (req : Request, res : Response) => {
    
    // Get id param and data
    const { id } = req.params;
    const { password, google, ...data } = req.body;

    try {

        // Obtain the identification document
        let docRef = await getUser(id);

        // Verification if there is an agent
        if(!docRef?.exists){
            return res.status(400).json({
                msg: 'Error The identification is not already in the database'
            }); 
        }

        if( password ) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            data.pass = bcryptjs.hashSync( password,  salt);
        }

        // Fields: identification and status 
        data.identification = docRef?.data().identification;
        data.status = true;

        // Update the document with new data
        await userRef.doc(docRef?.id).update(data);

        const resp = await userRef.where('status', '==', true)
                                   .where('identification','==', id).get();

        const documents = returnDocsFirebase(resp);

        // Send data
        res.json({
            ok: true,
            user : documents
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: update a user'
        });
    }

}

export const deleteUser = async(req : Request, res : Response) => {

    // Get id param
    const { id } = req.params;

    try {
        
        // Obtain the identification document
        let docRef = await getUser(id);

        // Verification if there is an agent
        if(!docRef?.exists){
            return res.status(400).json({
                msg: 'Error The identification is not already in the database'
            }); 
        }

        // Update the document with status in false
        await userRef.doc(docRef?.id).update({
            status : false
        });

        // Obtain new data 
        const resp = await userRef.where('status', '==', false)
                                  .where('identification','==', id).get();

        const documents = returnDocsFirebase(resp);

        // Send data
        res.json({
            ok: true,
            user : documents
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: delete a user'
        });
    }

}

export const getUser = async (id : String, status = true) => {
    
    // Obtain all agents with status true / false (param) and id equal
    const resp = await userRef.where('status', '==', status)
                                   .where('identification','==', id).get();

    // From the list obtain documento with id equal
    const docRef = resp.docs.find((doc) => {
        if(doc.data().identification === id){
            return doc;
        }
    });

    return docRef;

}