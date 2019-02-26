import React, { Component } from 'react';//
import { Redirect } from 'react-router-dom';//
import firebase from "firebase";//
import { firestoreConnect } from 'react-redux-firebase'; //
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';//
import { updateInvoice } from '../../store/actions/invoiceActions';
import { compose } from 'redux';


//styling variables for dropzone preview box
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
const deleteButtonStyle = {
    position: 'absolute',
    width: '25px',
    height: '25px',
    zIndex: 2,
    marginTop: 0,
    textAlign: 'center'
    
}


class UpdateDocument extends Component {
    
    constructor(props) {
        super(props);
       
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
   
    

    render() {
        //const { invoice } = this.props;
        console.log('project update render');
        console.log(this.props);
        


        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        return (
        <div>
            <div className="container">
                <p>test running in background</p>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const invoices = state.firestore.data.invoices;
    //const invoice = invoices ? invoice[id] : null;
    console.log('MAP STATE');
    console.log(state);
    return {
        auth: state.firebase.auth,
        invoiceId: id,
        //invoice: invoice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateInvoice: (invoiceId) => dispatch(updateInvoice(invoiceId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'invoices', where: [
            'userId', '==', props.auth.uid ? props.auth.uid : null
        ] }
    ])
)(UpdateDocument);


