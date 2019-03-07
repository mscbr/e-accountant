import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';


import InvoiceListAccountant from '../projects/InvoiceListAccountant';
import { Redirect } from 'react-router-dom';

class AccountantPanel extends Component {
    
    render() {
        //console.log(this.props);
        const { invoices, auth} = this.props;
        if (!auth.uid) {
            return <Redirect to='/' />;
        } else if (auth.uid !== "8XfhiRtQuugytCSQO9LrFDQXtNr2") {
            return <Redirect to='/' />;
        } else if (isLoaded(invoices)) {
            return (
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card z-depth-0 teal darken-3">
                                <span className="card-title white-text bold">INVOICES</span>
                            </div>

                            <InvoiceListAccountant invoices={invoices} users={this.props.users} />
                        </div>
                        <div className="col s12 m6">
                            <div className="card z-depth-0 teal darken-3">
                                <span className="card-title white-text">SETTLEMENTS</span>
                            </div>
                        </div>
                    </div>
                </div>
                );
        } else {
            return ( 
                <div className="container center">
                    <p>Loading invoice...</p>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    
    return {
        invoices: state.firestore.ordered.invoices,
        auth: state.firebase.auth,
        users: state.firestore.ordered.users  
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'invoices', orderBy: ['createdAt', 'desc'] },
        { collection: 'users', where: [
            'isAcc', '==', false
        ] }
    ])
)(AccountantPanel);



