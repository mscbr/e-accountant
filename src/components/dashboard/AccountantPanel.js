import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Notifications from './Notifications';
import InvoiceList from '../projects/InvoiceDetails';
import { Redirect } from 'react-router-dom';

class AccountantPanel extends Component {
    
    render() {
        //console.log(this.props);
        const { invoices, auth, notifications } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m5">
                        <InvoiceList invoices={invoices} />
                    </div>
                    <div className="col s12 m5">
                        <DeductionList deductions={deductions} />
                    </div>
                    <div className="col s12 m2 offset-m1">
                        <Notifications notifications={notifications} />
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
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'invoices', orderBy: ['createdAt', 'desc'] /*ADD USERS COLLECTION & PASS UID AS A PROPS TO PROJECT LIST*/},
        { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(AccountantPanel);



