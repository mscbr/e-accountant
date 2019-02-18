import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import firebase from "firebase";
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';
import DeleteInvoiceDialog from './DeleteInvoiceDialog'
import { deleteInvoice } from '../../store/actions/invoiceActions';

//invoice files previews styling variables
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};
  
const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    position: 'relative',
    width: 'auto',
    height: '100%',
    zIndex: 0
}

class InvoiceDetails extends Component {
    constructor(props) {
        super(props);
    }

    handleDelete = () => {
        //deleting invoice from database
        this.props.deleteInvoice(this.props.invoiceId);
        //deleting invoice files from storage
        const filesName = this.props.invoice.filesName;
        filesName.map(file => {
            firebase 
                .storage()
                .ref('uploaded')
                .child(file)
                .delete()
                .then(() => {
                    console.log(file+" succesfully deleted")
                }).catch((err) => {
                    console.log(err);
                })
        });
        //redirecting after delete
        this.props.history.push('/dashboard');
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />

        const { invoice } = this.props;
        console.log(invoice);
        

        

        if (invoice) {
            const previews = invoice.filesUrl;
            const thumbs = invoice.filesName.map(fileName => {
                return (
                    <div style={thumb} key={fileName}>
                        <div style={thumbInner}>
                            <img
                                src={previews[fileName]}
                                style={img}
                                alt={fileName}
                            />
                            
                        </div>
                    </div>
                );
            });
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{invoice.title}</span>
                            <aside style={thumbsContainer}>
                                {thumbs}
                            </aside>
                            <p></p>
                            <p>Comments: {invoice.comment}</p>
                            <DeleteInvoiceDialog handleDelete={this.handleDelete} />
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
        invoiceId: ownProps.match.params.id,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteInvoice: (invoiceId) => dispatch(deleteInvoice(invoiceId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'invoices', where: [
            'userId', '==', props.auth.uid ? props.auth.uid : null
        ] }
    ])
)(InvoiceDetails);
