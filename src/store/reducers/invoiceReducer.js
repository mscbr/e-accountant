
const initState = {
    invoices: []
};

const invoiceReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_INVOICE':
            console.log('created invoice', action.invoice);
            return state;
        case 'CREATE_INVOICE_ERROR':
            console.log('create project error: ', action.err);
            return state;
        default:
            return state;    
    }
};

export default invoiceReducer;