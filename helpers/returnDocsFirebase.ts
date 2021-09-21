
import firebase from 'firebase';

export const returnDocsFirebase = ( snapshot : firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {

    const documents : any[] = [];

    snapshot.forEach( snapchild => {

        const temp = snapchild.data();
        delete temp.status;

        documents.push({
            id_agent: snapchild.id,
            ...temp
        });
    });

    // console.log(documents);
    return documents;

}