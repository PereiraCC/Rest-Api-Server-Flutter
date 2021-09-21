"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnDocsFirebase = void 0;
const returnDocsFirebase = (snapshot) => {
    const documents = [];
    snapshot.forEach(snapchild => {
        const temp = snapchild.data();
        delete temp.status;
        documents.push(Object.assign({ id_agent: snapchild.id }, temp));
    });
    // console.log(documents);
    return documents;
};
exports.returnDocsFirebase = returnDocsFirebase;
//# sourceMappingURL=returnDocsFirebase.js.map