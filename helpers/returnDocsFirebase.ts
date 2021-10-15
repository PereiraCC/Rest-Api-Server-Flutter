
import firebase from 'firebase';

export const returnDocsFirebase = ( snapshot : firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {

    const documents : any[] = [];

    // We go through the information
    snapshot.forEach( snapchild => {

        // Get agent and delete the status propety
        const temp = snapchild.data();
        delete temp.status;
        delete temp.pass;

        // Save agent in list
        documents.push({
            uid: snapchild.id,
            ...temp
        });
    });

    // console.log(documents);
    return documents;

}