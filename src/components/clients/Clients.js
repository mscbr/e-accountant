import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ClientList from './ClientList'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class Clients extends Component {
    
    render() {
        const {users, auth} = this.props;
        if (!auth.uid) {
            return <Redirect to='/' />;
        }
        if (users) {
            return (
                <div className='container'>
                    <ClientList clients={users} />
                </div>
            )
        } else {
            return (
                <div className='container'>
                    <p>Ładowanie...</p>
                </div>
            )
        }
       
    }
}

const mapStateToProps = (state) => {
    
    return {
        users: state.firestore.ordered.users,
        auth: state.firebase.auth
    };
} 


export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'users', where: [
            'isAcc', '==', false
        ] }
    ])
)(Clients);