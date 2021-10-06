import db from '../db/config';

// Reference the agents collection in database 
const agentRef = db.collection('agents');

export const inyectionSqlInputs = ( data : string) => {

    if(data.toUpperCase().includes('SELECT') || data.toUpperCase().includes('DELETE') ||
        data.toUpperCase().includes('UPDATE') || data.toUpperCase().includes('INSERT')){
            throw new Error('Error: Invalid data');
        }
}

export const existsIdentification = async (id : string) => {

    // Get data from database with id equal
    const resp = await agentRef.where('identification', '==', id).get();
    
    // resp.docs.forEach((doc) => {
    //     console.log(doc.data());
    // })

    // check for documents
    if( resp.docs.length > 0 ){
        throw new Error('Error: The identification is already in the database');
    }

}

export const existsAgentbyId = async (id : string) => {

    // Obtain all agents with id equal
    const resp = await agentRef.where('identification', '==', id).get();

    // Check for documents
    if( resp.docs.length == 0 ){
        throw new Error('Error: The identification is not already in the database');
    }

}

export const allowableCollections = ( collection : String = '', collections : Array<String> = []) => {

    const included = collections.includes( collection );

    if( !included ) {
        throw new Error(`The collection: ${ collection } is not allowed, Collections: ${collections}`);
    }
    return true;

}

export const lenghtPassword = async ( password : string ) => {

    if(password.length < 6) {
        throw new Error(`Error: Password must be longer than 6 characters`);
    }

}