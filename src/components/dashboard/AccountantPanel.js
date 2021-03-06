import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


import InvoiceListAccountant from '../projects/InvoiceListAccountant';
import { Redirect } from 'react-router-dom';
import SettlementListAccountant from '../projects/SettlementListAccountant';

class AccountantPanel extends Component {
    
    render() {
        //console.log(this.props);
        const { invoices, auth, settlements} = this.props;
        if (!auth.uid) {
            return <Redirect to='/' />;
        } else if (auth.uid !== "8XfhiRtQuugytCSQO9LrFDQXtNr2") {
            return <Redirect to='/dashboard' />;
        } else if (invoices && settlements) {
            return (
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card z-depth-0" style={{background: "rgba(64, 70, 84, 0.74)"}}>
                                <span className="card-title white-text bold">INVOICES</span>
                            </div>

                            <InvoiceListAccountant invoices={invoices} users={this.props.users} />
                        </div>
                        <div className="col s12 m6">
                            <div className="card z-depth-0" style={{background: "rgba(64, 70, 84, 0.74)"}}>
                                <span className="card-title white-text">SETTLEMENTS</span>
                            </div>
                            
                            <SettlementListAccountant invoices={settlements} users={this.props.users} />
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
    //console.log(state);
    return {
        invoices: state.firestore.ordered.invoices,
        settlements: state.firestore.ordered.settlements,
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
        ] },
        { collection: 'settlements', orderBy: ['createdAt', 'desc'] }
    ])
)(AccountantPanel);



