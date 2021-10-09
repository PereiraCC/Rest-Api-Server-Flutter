// Configuration of cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

export const uploadImage = async ( tempPath : string, isNew : boolean = true, imagePath : string = '') => {

    try {
        
        if(!isNew){
                
            const nombreArr     = imagePath.split('/');
            const nombre        = nombreArr[ nombreArr.length - 1]; 
            const [ public_id ] = nombre.split('.');
            cloudinary.uploader.destroy( public_id );
            
        }

        const { secure_url } = await cloudinary.uploader.upload( tempPath );

        return secure_url;

    } catch (error) {
        console.log(error);
        throw new Error('Error upload image');
    }

}