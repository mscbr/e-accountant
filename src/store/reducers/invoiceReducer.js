
const initState = {
    invoices: [
        {id: '1', title: 'Last Sales', date: '2019-02-18', comment: 'Sales done with important clients', files: []},
        {id: '2', title: 'Data Exchange Transaction', date: '2019-01-18', comment: 'none', files: []},
        {id: '3', title: 'Office items', date: '2018-01-18', comment: 'New chairs for the office', files: []}
    ]
};

const invoiceReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_INVOICE':
            console.log('created invoice', action.invoice)
    }


    return state;
};

export default invoiceReducer;