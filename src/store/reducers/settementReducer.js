const initState = {
    settlements: []
}

const settlementReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_SETTLEMENT':
            console.log('created invoice', action.settlement.title);
            return state;
        case 'CREATE_SETTLEMENT_ERROR':
            console.log('create project error: ', action.err);
            return state;
        case 'DELETE_SETTLEMENT':
            console.log('invoice '+action+' successfully deleted');
            return state;
        case 'DELETE_SETTLEMENT_ERROR':
            console.log('delete invoice error', action.err);
            return state;
        default:
            return state;    
    }
}

export default settlementReducer;