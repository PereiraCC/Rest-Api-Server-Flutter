import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import db from '../db/config';
import { toJson } from '../models/user';

// Reference to collection of users in firebase
const userRef = db.collection('users');

export const validationJWT = async ( req : Request, res : Response, next : NextFunction ) => {

    const token : string | undefined = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No token'
        });
    }

    try {

        const { uid } : jwt.JwtPayload = jwt.verify( token, process.env.SECRETORPRIVATEKEY as Secret ) as jwt.JwtPayload;

        const resp = await userRef.where('status', '==', true)
                                   .where('identification','==', uid).get();

        if( resp.docs.length == 0 ){
            return res.status(401).json({
                msg: 'Token - not valid - user does not exist in DB'
            });
        }

        req.user = toJson(resp.docs[0].data());

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
}