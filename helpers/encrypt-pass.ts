import bcryptjs from 'bcryptjs';

export const encryptPass = (pass : string) : string => {

    try {
        
        const salt : string = bcryptjs.genSaltSync();
        return bcryptjs.hashSync(pass, salt);
        
    } catch (error) {
        console.log(error);
        throw new Error('Error: encrypt password');
    }

}