


export const createInvoice = (invoice) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database  
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        let collectionType = null;
        //setting up collection due to the invoice type
        switch(invoice.docType) {
            case 'sale':
                collectionType = 'saleInvoices';
                break;
            case 'expence':
                collectionType = 'expenceInvoices';
                break;
            case 'other':
                collectionType = 'otherDocuments';
                break;
            default:
                collectionType = null;
                
        }
        console.log('collection: '+ collectionType);

        firestore.collection(collectionType).add({
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