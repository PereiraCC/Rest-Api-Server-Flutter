import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import db from '../db/config';
import User from "../models/user";
import { returnDocsFirebase } from "../helpers/returnDocsFirebase";

// Reference to collection of agents in firebase
const userRef = db.collection('users');

export const getUsers = async (req : Request, res : Response) => {

    try {

        // Get all users with status in true
        const resp = await userRef.where('status', '==', true).get();

        // Processing collection data
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

export const getUserById = (req : Request, res : Response) => {

    try {
        
        return res.status(200).json({
            msg: 'get a user'
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

export const putUser = (req : Request, res : Response) => {

    try {
        
        return res.status(200).json({
            msg: 'update a user'
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: update a user'
        });
    }

}

export const deleteUser = (req : Request, res : Response) => {

    try {
        
        return res.status(200).json({
            msg: 'delete a user'
        });

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(500).json({
            msg: 'Error: delete a user'
        });
    }

}