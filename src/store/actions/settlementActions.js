

export const createSettlement = (settlement) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //async call to database  
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
       
        firestore.collection('settlements').add({
            ...settlement,
            createdAt: new Date(),
            opened: false
        }).then(() => {
            dispatch({ type: 'CREATE_SETTLEMENT', settlement });
        }).catch((err) => {
            dispatch({ type: 'CREATE_SETTLEMENT_ERROR', err });
        });
    }
}; 

export const deleteSettlement = (settlementId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('settlements').doc(settlementId).delete().then(() => {
            dispatch({ type: 'DELETE_SETTLEMENT', settlementId });
        }).catch((err) => {
            dispatch({ type: 'DELETE_SETTLEMENT_ERROR', err});
        });
    }
};