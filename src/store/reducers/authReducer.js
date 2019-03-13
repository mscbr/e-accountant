
const initState = {
    authError: null
    

};

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error');
            return {
                ...state,
                authError: 'Login failed'
                            }
        case 'LOGIN_SUCCESS':
            console.log('login success');
            return {
                ...state,
                authError: null
                
            }
        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error');
            return {
                ...state,
                authError: action.err.message
            }
        case 'DELETE_USER':
            console.log('user deleted');
            return {
                ...state,
                authError: null
            }
        case 'DELETE_USER_ERROR':
            console.log('error', action.err);
        return {
            ...state,
            authError: action.err.message
        }
        case 'UPDATE_USER':
            console.log('user '+action.uid+' data was updated');
            return state;
        case 'UPDATE_USER_ERROR':
            console.log('error', action.err);
            return state;
        default:
            return state;
    }     
};

export default authReducer;