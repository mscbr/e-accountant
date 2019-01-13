import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import { compose } from 'redux';

const ProjectDetails = (props) => {
    
    const { invoice } = props;
    if (invoice) {
        return (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{invoice.title}</span>
                        <p>Comments: {invoice.comment}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by the {invoice.userName}</div>
                        <div>{invoice.date}</div>
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

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const invoices = state.firestore.data.invoices;
    const invoice = invoices ? invoices[id] : null;
    return {
        invoice: invoice
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([{ collection: 'invoices' }])
)(ProjectDetails);
