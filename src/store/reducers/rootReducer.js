import authReducer from './authReducer';
import invoiceReducer from './invoiceReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({ 
    auth: authReducer,
    invoice: invoiceReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;