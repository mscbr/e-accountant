


export const createInvoice = (invoice) => {
    return (dispatch, getState) => {
        //make async call to database  
        
        dispatch({ type: 'CREATE_INVOICE', invoice })
    }
}