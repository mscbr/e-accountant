import authReducer from './authReducer';
import invoiceReducer from './invoiceReducer';
import settlementReducer from './settementReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'


const rootReducer = combineReducers({ 
    auth: authReducer,
    invoice: invoiceReducer,
    settlement: settlementReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;