import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    
    render() {
        //console.log(this.props);
        const { invoices, auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <ProjectList invoices={invoices} />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        invoices: state.firestore.ordered.invoices,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'invoices' /*ADD USERS COLLECTION & PASS UID AS A PROPS TO PROJECT LIST*/}])
)(Dashboard);



