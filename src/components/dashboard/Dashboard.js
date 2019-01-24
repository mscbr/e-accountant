import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


import InvoiceList from '../projects/InvoiceList';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    
    render() {
        
        const { saleInvoices, expenceInvoices, otherDocuments ,auth} = this.props;
        const isLoaded = saleInvoices && expenceInvoices && otherDocuments ? true : false;
        //console.log('isLoaded: '+ isLoaded);
        
        if (!auth.uid) return <Redirect to='/' />
        
        if (isLoaded) {
            const invoices =[...saleInvoices, ...expenceInvoices, ...otherDocuments];
            
              return (
                    <div className="dashboard container">
                        <div className="row">
                            <div className="col s12 m6">
                                <div className="card z-depth-0 teal darken-3">
                                    <span className="card-title white-text">INVOICES</span>
                                </div>

                                <InvoiceList invoices={invoices} />
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
        saleInvoices: state.firestore.ordered.saleInvoices,
        expenceInvoices: state.firestore.ordered.expenceInvoices,
        otherDocuments: state.firestore.ordered.otherDocuments,
        auth: state.firebase.auth,
        //notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'saleInvoices', orderBy: ['createdAt', 'desc'] },
        { collection: 'otherDocuments', orderBy: ['createdAt', 'desc'] },
        { collection: 'expenceInvoices', orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);



