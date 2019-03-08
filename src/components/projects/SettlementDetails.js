import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import firebase from "firebase";
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';
import DeleteInvoiceDialog from './DeleteInvoiceDialog'
import { deleteInvoice } from '../../store/actions/invoiceActions';
import { Link } from 'react-router-dom';

const commentsBoxStyle = {
    width: '99%',
    minHeight: 100,
    padding: 10,
    border: '1px dashed grey',
    borderRadius: '10px'
}

class SettlementDetails extends Component {
    constructor(props) {
        super(props);
    }

    // handleDelete = () => {
    //     //deleting invoice from database
    //     this.props.deleteInvoice(this.props.invoiceId);
    //     //deleting invoice files from storage
    //     const filesName = this.props.invoice.filesName;
    //     if(filesName) {
    //         filesName.map(file => {
    //             firebase 
    //                 .storage()
    //                 .ref('uploaded')
    //                 .child(file)
    //                 .delete()
    //                 .then(() => {
    //                     console.log(file+" succesfully deleted")
    //                 }).catch((err) => {
    //                     console.log(err);
    //                 })
    //         });
    //     }
        
    //     //redirecting after delete
    //     this.props.history.push('/dashboard');
        
    // }


    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />

        const { settlement } = this.props;
     
        if (settlement) {
            
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{settlement.title}</span>
                            <p className="grey-text">Files for period: {settlement.issuePeriod}</p>
                            
                            <p>Comments:</p>
                            <div className="comments-box" style={commentsBoxStyle}>
                                <p>{settlement.comment}</p>
                            </div>
                            {/* IF ISACC */}
                            {/* <div className="bottom-btn-container" style={{display: 'flex'}}>
                                <DeleteInvoiceDialog handleDelete={this.handleDelete} />
                            </div> */}
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            {/* <div>Posted by the {invoice.clientName}</div> */}
                            <div>{moment(settlement.createdAt.toDate()).calendar()}</div>
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
    console.log(state);
    const id = ownProps.match.params.id;
    const settlements = state.firestore.data.settlements;
    const settlement = settlements ? settlements[id] : null;
    return {
        settlement: settlement,
        settlementId: ownProps.match.params.id,
        auth: state.firebase.auth
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         deleteInvoice: (invoiceId) => dispatch(deleteInvoice(invoiceId))
//     }
// }

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'settlements'},
        { collection: 'users' }
    ])
)(SettlementDetails);
