import jwt from 'jsonwebtoken';


export const generateJWT = ( uid : string = '') => {

    try {
        
        return new Promise( (resolve, reject) => {

            const payload = { uid };

            jwt.sign(payload, process.env.SECRETORPRIVATEKEY as jwt.Secret, {
                expiresIn: '4h'
            }, (err, token ) => {
    
                if( err ) {
                    console.log(err);
                    reject('The token could not be generated')
                } else {
                    resolve( token );
                }
            });
        });

    } catch (error) {
        console.log(`Error generateJWT: ${error}`);
        return new Error('Error generate Json Web Token');
    }

}

