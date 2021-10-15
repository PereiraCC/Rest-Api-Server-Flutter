"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnDocsFirebase = void 0;
const returnDocsFirebase = (snapshot) => {
    const documents = [];
    // We go through the information
    snapshot.forEach(snapchild => {
        // Get agent and delete the status propety
        const temp = snapchild.data();
        delete temp.status;
        delete temp.pass;
        // Save agent in list
        documents.push(Object.assign({ uid: snapchild.id }, temp));
    });
    // console.log(documents);
    return documents;
};
exports.returnDocsFirebase = returnDocsFirebase;
//# sourceMappingURL=returnDocsFirebase.js.map