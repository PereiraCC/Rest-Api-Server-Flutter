import db from '../db/config';

const agentRef = db.collection('agents');

export const inyectionSqlInputs = ( data : string) => {

    console.log('data', data.toUpperCase());

    if(data.toUpperCase().includes('SELECT') || data.toUpperCase().includes('DELETE') ||
        data.toUpperCase().includes('UPDATE') || data.toUpperCase().includes('INSERT')){
            throw new Error('Error: Invalid data');
        }
}

export const existsIdentification = async (id : string) => {

    const resp = await agentRef.where('identification', '==', id).get();
    
    // resp.docs.forEach((doc) => {
    //     console.log(doc.data());
    // })

    if( resp.docs.length > 0 ){
        throw new Error('Error: The identification is already in the database');
    }

}

export const existsAgentbyId = async (id : string) => {

    const resp = await agentRef.where('identification', '==', id).get();


    if( resp.docs.length == 0 ){
        throw new Error('Error: The identification is not already in the database');
    }

}