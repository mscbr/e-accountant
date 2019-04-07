import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import DeleteUserDialog from './DeleteUserDialog';
import { deleteUser } from '../../store/actions/authActions'
import { Link } from 'react-router-dom';

const updateButtonStyle = {
    backgroundColor: '#ef5350',
    color: 'white',
    paddingTop: '5px',
    paddingLeft: '7px',
    paddingRight: '7px',
    marginTop: '5px',
    marginRight: '5px',
    transition: 'background-color .1s',
    '&:hover': {
        backgroundColor: '#f44336'
    },
    '&:focus' : {
        backgroundColor: '#ef5350'
      }
}

class AccountDetails extends Component {

    handleDeleteUser = (uid) => {
        this.props.deleteUser(uid);
    }

    render() {
        
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        
        if (this.props.users && auth) {
            const userInfo = this.props.users[auth.uid];
            console.log(auth.uid);
            if(userInfo) {
                return (
                    <div className="container section">
                        <div className="card z-depth-0" style={{transform: 'scale(1.2)', margin: 100}}>
                            <div className="card-content" >
                                <span className="card-title">{userInfo.clientName}</span>
                                <p className="grey-text">Email: <span className="grey-text text-darken-2">{auth.email}</span></p>
                                <p className="grey-text">Adres: <span className="grey-text text-darken-2">{userInfo.adress}</span></p>
                                <p className="grey-text">Forma prawna: <span className="grey-text text-darken-2">{userInfo.legalForm}</span></p>
                                <p className="grey-text">NIP: <span className="grey-text text-darken-2">{userInfo.nip}</span></p>
                                <p className="grey-text">REGON: <span className="grey-text text-darken-2">{userInfo.regon}</span></p>
                                <p className="grey-text">Telefon: <span className="grey-text text-darken-2">{userInfo.phoneNumber}</span></p>
                                <div className="bottom-btn-container" style={{display: 'flex'}}>
                                    <Link 
                                        to={'/update/accountdetails/'+auth.uid} 
                                        key={'update'}
                                        style={updateButtonStyle}
                                    >Aktualizuj Dane</Link>
                                    <DeleteUserDialog handleDeleteUser={() => this.handleDeleteUser(auth.uid)} />
                                </div>
                            </div>
                        </div>      
                    </div>
                );
            } else {
                return (
                    <div className="container center">
                        <p>Ładowanie...</p>
                    </div>
                );
            }
            
        } else {
            return (
                <div className="container center">
                    <p>Ładowanie...</p>
                </div>
            );
        }   
    
    }
}

const mapStateToProps = (state) => {
    // console.log('state');
    // console.log(state.firebase.auth);
    
    return {
        auth: state.firebase.auth,
        users: state.firestore.data.users
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (uid) => dispatch(deleteUser(uid))
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { 
            collection: 'users',
            doc: props.auth.uid
        }
    ])
)(AccountDetails);