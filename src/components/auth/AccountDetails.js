import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AccountDetails extends Component {

  render() {
    //console.log(this.props);
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/' />
    
    if (this.props.users && auth) {
        const userInfo = this.props.users[auth.uid];
        console.log(userInfo);
        if(userInfo) {
            return (
                <div className="container section">
                    <div className="card z-depth-0" style={{transform: 'scale(1.2)', margin: 100}}>
                        <div className="card-content" >
                            <span className="card-title">{userInfo.clientName}</span>
                            <p className="grey-text">Email: <span className="grey-text text-darken-2">{auth.email}</span></p>
                            <p className="grey-text">Adress: <span className="grey-text text-darken-2">{userInfo.adress}</span></p>
                            <p className="grey-text">Legal form: <span className="grey-text text-darken-2">{userInfo.legalForm}</span></p>
                            <p className="grey-text">NIP: <span className="grey-text text-darken-2">{userInfo.nip}</span></p>
                            <p className="grey-text">REGON: <span className="grey-text text-darken-2">{userInfo.regon}</span></p>
                            <p className="grey-text">Phone: <span className="grey-text text-darken-2">{userInfo.phoneNumber}</span></p>
                        </div>
                    </div>      
                </div>
            );
        } else {
            return (
                <div className="container center">
                    <p>Loading...</p>
                </div>
            );
        }
        
    } else {
        return (
            <div className="container center">
                <p>Loading...</p>
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
    return {};
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