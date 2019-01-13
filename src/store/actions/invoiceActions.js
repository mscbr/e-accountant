


export const createInvoice = (invoice) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database  
        const firestore = getFirestore();
        firestore.collection('invoices').add({
            ...invoice,
            userName: 'Maciej Waclaw',
            userId: 123,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_INVOICE', invoice });
        }).catch((err) => {
            dispatch({ type: 'CREATE_INVOICE_ERROR', err });
        });


       
    }
}; 