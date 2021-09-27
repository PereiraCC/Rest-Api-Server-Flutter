
export const extensionValidation = (fileName : String = '', extensions: Array<String> = []) => {

    const cutName = fileName.split('.');
    const extension = cutName[ cutName.length - 1 ];
    extensions = extensions.map((e) => e.toUpperCase());

    if( !extensions.includes( extension.toUpperCase() )){
        return false;
    }

    return true;

}