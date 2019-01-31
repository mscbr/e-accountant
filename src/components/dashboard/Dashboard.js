import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';


import InvoiceList from '../projects/InvoiceList';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
    
    render() {
        
        const { invoices, auth} = this.props;
        if (!auth.uid) {
            return <Redirect to='/' />;
        } else if (isLoaded) {
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
        auth: state.firebase.auth   
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'invoices', where: [
            'userId', '==', props.auth.uid
        ], orderBy: ['createdAt', 'desc'] }
    ])
)(Dashboard);



