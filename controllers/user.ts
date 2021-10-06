import { Request, Response } from "express";


export const getUsers = (req : Request, res : Response) => {

    try {

        return res.status(200).json({
            msg: 'get all users'
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

export const postUser = (req : Request, res : Response) => {

    try {
        
        return res.status(200).json({
            msg: 'create a user'
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