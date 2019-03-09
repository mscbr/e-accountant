import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';


import InvoiceList from '../projects/InvoiceList';
import { Redirect } from 'react-router-dom';
import SettlementList from '../projects/SettlementList';

class Dashboard extends Component {
    
    render() {
        //console.log(this.props);
        const { invoices, auth, user, settlements} = this.props;
        if (user) {
            if (user[0].isAcc === true) {
                return <Redirect to='/accpanel' />;
            }
        }
        if (!auth.uid) {
            return <Redirect to='/' />;
        } else if (invoices && settlements) {
            return (
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card z-depth-0 teal darken-3">
                                <span className="card-title white-text bold">INVOICES</span>
                            </div>
                            <InvoiceList invoices={invoices} />
                        </div>
                        <div className="col s12 m6">
                            <div className="card z-depth-0 teal darken-3">
                                <span className="card-title white-text">SETTLEMENTS</span>
                            </div>
                            <SettlementList invoices={settlements} />
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
        settlements: state.firestore.ordered.settlements,
        auth: state.firebase.auth,
        user: state.firestore.ordered.users  
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'invoices', where: [
            'userId', '==', props.auth.uid ? props.auth.uid : null
        ], orderBy: ['createdAt', 'desc'] },
        { collection: 'users', doc: props.auth.uid },
        { collection: 'settlements', where: [
            'clientId', '==', props.auth.uid ? props.auth.uid : null
        ], orderBy: ['createdAt', 'desc'] },
    ])
)(Dashboard);



