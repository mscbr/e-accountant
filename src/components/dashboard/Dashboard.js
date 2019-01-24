import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


import InvoiceList from '../projects/InvoiceList';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    
    render() {
        
        const { invoices, expenceInvoices ,auth} = this.props;
        const isLoaded = invoices && expenceInvoices ? true : false;
        console.log('isLoaded: '+ isLoaded);
        
        if (!auth.uid) return <Redirect to='/' />
        
        if (isLoaded) {
            const invoices1 = Object.values(Object.assign({}, invoices, expenceInvoices));
            console.log(invoices1);
              return (
                    <div className="dashboard container">
                        <div className="row">
                            <div className="col s12 m6">
                                <div className="card z-depth-0 teal darken-3">
                                    <span className="card-title white-text">INVOICES</span>
                                </div>

                                <InvoiceList invoices={invoices1} />
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
    //console.log(state);
    return {
        invoices: state.firestore.ordered.invoices,
        expenceInvoices: state.firestore.ordered.expenceInvoices,
        auth: state.firebase.auth,
        //notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'invoices', orderBy: ['createdAt', 'desc'] /*ADD USERS COLLECTION & PASS UID AS A PROPS TO PROJECT LIST*/},
        //{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
        { collection: 'expenceInvoices', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);



