

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS'});
            
           
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        })
    }
};

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {


            return firestore.collection('users').doc(resp.user.uid).set({
                clientName: newUser.clientName,
                initials: newUser.clientName.slice(0,3),
                adress: newUser.adress,
                legalForm: newUser.legalForm,
                nip: newUser.nip,
                regon: newUser.regon,
                phoneNumber: newUser.phoneNumber,
                isAcc: newUser.accountant === "true" ? true : false
                })
           
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err});            
        })
    }
}

export const deleteUser = (uid) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firestore.collection('users').doc(uid).delete().then(() => {
            console.log('user details deleted...');
            firebase.auth().currentUser.delete().then(() => {
                dispatch({ type: 'DELETE_USER' });
                console.log('user deleted')
            }).catch((err) => {
                dispatch({ type: 'DELETE_USER_ERROR', err });
                console.log(err);
            })
        }).catch((err)=> {
            console.log(err);
        })

       
    }
}

export const updateUser = (uid, userData) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore.collection('users').doc(uid).update({
            ...userData
        }).then(()=> {
            dispatch({ type: 'UPDATE_USER', uid });
        }).catch((err)=> {
            dispatch({ type: 'UPDATE_USER_ERROR', err });
        });
    }
}