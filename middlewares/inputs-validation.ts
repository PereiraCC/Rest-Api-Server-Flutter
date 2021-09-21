
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldsValidation = ( req : Request, res: Response, next : NextFunction ) => {

    // Catch errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        // Send errors
        return res.status(400).json(errors);
    }

    next();
}
