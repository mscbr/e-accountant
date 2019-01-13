import authReducer from './authReducer';
import invoiceReducer from './invoiceReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({ 
    auth: authReducer,
    invoice: invoiceReducer,
    firestore: firestoreReducer
});

export default rootReducer;