import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';


class InvoiceDetails extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        console.log(this.props);
        const { invoice } = this.props;
        if (invoice) {
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{invoice.title}</span>
                            <p>Comments: {invoice.comment}</p>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted by the {invoice.clientName}</div>
                            <div>{moment(invoice.createdAt.toDate()).calendar()}</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return ( 
                <div className="container center">
                    <p>Loading invoice...</p>
                </div>
                );
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const invoices = state.firestore.data.invoices;
    const invoice = invoices ? invoices[id] : null;
    return {
        invoice: invoice,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'invoices', where: [
            'userId', '==', props.auth.uid ? props.auth.uid : null
        ] }
    ])
)(InvoiceDetails);
