
export const extensionValidation = (fileName : String = '', extensions: Array<String> = []) => {

    const cutName = fileName.split('.');
    const extension = cutName[ cutName.length - 1 ];
    console.log(extension);

    if( !extensions.includes( extension )){
        return false;
    }

    return true;

}