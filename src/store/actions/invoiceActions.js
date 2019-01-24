


export const createInvoice = (invoice) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database  
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        console.log('docType: '+ invoice.docType);

        firestore.collection('invoices').add({
            ...invoice,
            firstName: profile.firstName,
            lastName: profile.lastName,
            userId: authorId,
            createdAt: new Date(),
            opened: false,
            settled: false
        }).then(() => {
            dispatch({ type: 'CREATE_INVOICE', invoice });
        }).catch((err) => {
            dispatch({ type: 'CREATE_INVOICE_ERROR', err });
        });
    }
}; 