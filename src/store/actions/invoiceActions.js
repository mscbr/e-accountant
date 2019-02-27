


export const createInvoice = (invoice) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //async call to database  
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        
        //multiple function execution test
        function test() {
            console.log('testing multiple funcs');
        }
        test();

        firestore.collection('invoices').add({
            ...invoice,
            clientName: profile.clientName,
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

export const deleteInvoice = (invoiceId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('invoices').doc(invoiceId).delete().then(() => {
            dispatch({ type: 'DELETE_INVOICE', invoiceId });
        }).catch((err) => {
            dispatch({ type: 'DELETE_INVOICE_ERROR', err});
        });
    }
};

export const updateInvoice = (invoiceId, invoice) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('invoices').doc(invoiceId).update({
            ...invoice,
            opened: false
        }).then(() => {
            dispatch({ type: 'UPDATE_INVOICE', invoiceId });
        }).catch((err) => {
            dispatch({ type: 'UPDATE_INVOICE_ERROR', err});
        });
    }
};