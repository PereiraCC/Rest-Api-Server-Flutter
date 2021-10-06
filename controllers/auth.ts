import { Request, Response } from "express";


export const login = async (req : Request, res: Response) => {

    try {
        
        const { email, password } = req.body;

        res.json({
            msg: 'login method',
            email, 
            password
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