import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 

import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';
import DeleteInvoiceDialog from './DeleteInvoiceDialog'
import { deleteSettlement } from '../../store/actions/settlementActions';


const commentsBoxStyle = {
    width: '99%',
    minHeight: 50,
    padding: 10,
    border: '1px dashed pink',
    borderRadius: '10px'
}
const taxBoxStyle = {
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

    handleDelete = () => {
        //deleting invoice from database
        this.props.deleteSettlement(this.props.settlementId);
        
        
        //redirecting after delete
        this.props.history.push('/dashboard');
        
    }


    render() {
        
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />

        const { settlement } = this.props;
        const { users } = this.props
        if (settlement && users && auth) {
            const taxes = Object.values(settlement.tax);
            const deleteButton = users[auth.uid].isAcc ? <DeleteInvoiceDialog handleDelete={this.handleDelete} /> : null;
            
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{settlement.title}</span>
                            <p>{users[settlement.clientId].clientName} TAX for period {settlement.issuePeriod}:</p>
                            <div className="tax-box" style={taxBoxStyle}>
                                {taxes.map(tax => <p key={tax[1]}>{tax}</p>)}
                            </div>
                            <p style={{marginTop: 25}}>Comments:</p>
                            <div className="comments-box" style={commentsBoxStyle}>
                                <p>{settlement.comment}</p>
                            </div>
                            
                            {/* IF ISACC */}
                            <div className="bottom-btn-container" style={{display: 'flex'}}>
                                {deleteButton}
                            </div>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Created: {moment(settlement.createdAt.toDate()).calendar()}</div>
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
    //console.log(state);
    const id = ownProps.match.params.id;
    const settlements = state.firestore.data.settlements;
    const settlement = settlements ? settlements[id] : null;
    return {
        settlement: settlement,
        users: state.firestore.data.users,
        settlementId: ownProps.match.params.id,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteSettlement: (settlementId) => dispatch(deleteSettlement(settlementId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'settlements'},
        { collection: 'users' }
    ])
)(SettlementDetails);
