import authReducer from './authReducer';
import invoiceReducer from './invoiceReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    invoice: invoiceReducer
});

export default rootReducer;