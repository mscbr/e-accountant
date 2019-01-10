
const initState = {
    invoices: [
        {title: 'Last Sales', date: '2019-02-18', comment: 'Sales done with important clients', files: null},
        {title: 'Data Exchange Transaction', date: '2019-01-18', comment: 'none', files: null},
        {title: 'Office items', date: '2018-01-18', comment: 'New chairs for the office', files: null}
    ]
};

const invoiceReducer = (state = initState, action) => {
    return state;
};

export default invoiceReducer;