import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from "firebase";
import { compose } from 'redux';

import { connect } from 'react-redux';

import { firestoreConnect } from 'react-redux-firebase';





class NewSettlement extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           title: '',
           clientId: '',
           issueYear: '',
           issueMonth: '',
           tax: {},
           taxRows: 1
        };    
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleMonthFormat = (e) => {
        if(e.target.value.length === 1) {
            e.target.value = "0" + e.target.value;
        }
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleTaxChange = (e) => {
        this.setState({
            tax: {
                ...this.state.tax,
                [e.target.id]: e.target.value
            }
        })
    }
    handleTaxRow = () => {
        const taxRowArr = [];
        for (let i = 2; i <= this.state.taxRows; i++) {
            taxRowArr.push(
                <div className="input-field" key={'taxRow'+i}>
                    <label htmlFor={'tax'+i}>TAX type - TAX amount</label>
                    <input  type='text' 
                        name={'tax'+i} value={this.state.tax['tax'+i]} id={'tax'+i} 
                        onChange={this.handleTaxChange}   style={{width: "25%", display: 'block'}}  
                    />
                </div>
            )
        }
        return taxRowArr;
    }
    handleAddTaxRow = () => {
        this.setState({
            taxRows: this.state.taxRows+1
        });
    }
    handleRemoveTaxRow = () => {

        if (this.state.taxRows>1) {
            const newTax = this.state.tax;
            delete newTax['tax'+this.state.taxRows];
            this.setState({
                tax: newTax,
                taxRows: this.state.taxRows-1
            });

        }
        
    }


    handleSubmit = (e) => {
        e.preventDefault();
        //FILTER OUT PASSED DATA
        const invoiceData = {
            docType: this.state.docType,
            title: this.state.title,
            issuePeriod: this.state.issueYear+'-'+this.state.issueMonth,
            comment: this.state.comment,
            
        }
        console.log(this.state);
        //this.props.createInvoice(invoiceData);
        //this.props.history.push('/dashboard');
    }
    disableSend = () => {
        const validationData = {
            title: this.state.title,
            clientId: this.state.clientId,
            clientName: this.state.clientName
            
        };
        let values = Object.values(validationData);
        return values.some(value => value.length < 1);
        
    }
    
   

    render() {
        
        const { auth } = this.props;
        const { users } = this.props;
        const taxRows = this.handleTaxRow();
        if (!auth.uid) return <Redirect to='/' />
        if (users) {
            return (
                <div>
                    <div className="container">
                        <form onSubmit={this.handleSubmit} className="white">
                            <h5 className="grey-text text-darken-3">Send New Settlement</h5>
                            <div className="input-field">
                                <label htmlFor="title">Title of settlement</label>
                                <input type="text" id="title" onChange={this.handleChange} /> 
                            </div>
                            <div className="input-field">
                                <select name="clientId" id="clientId" className="browser-default"
                                    onChange={this.handleChange} value={this.state.clientId}>
                                    <option value="" defaultValue disabled>Settlement for client:</option>
                                    {users.map(user => {
                                        return (
                                            <option value={user.id} key={user.id} id="clientId">{user.clientName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="row">
                                <div className="input-field col s3">
                                    <label htmlFor='issueYear'>Year</label>
                                    <input  type='number' id='issueYear' 
                                        name='issueYear' min='2017' max='2022' value={this.state.issueYear} 
                                        onChange={this.handleChange}   style={{width: 100}} required  
                                        />
                                </div>
                                <div className="input-field col s3">
                                    <label htmlFor='issueMonth'>Month</label>
                                    <input  type='number' id='issueMonth' 
                                        name='issueMonth' min='1' max='12' value={this.state.issueMonth} 
                                        
                                        onChange={this.handleMonthFormat}   style={{width: 75}} required 
                                        />
                                </div>
                                <label 
                                    style={{display: 'inline', position: 'relative', fontSize: '1.1rem', marginTop: 15}}
                                    className="col s5"
                                    >
                                        Period covered by the settlement
                                </label>
                            </div>
                            
                            <div className="input-field">
                                <label htmlFor='tax1'>TAX type - TAX amount</label>
                                <input  type='text' 
                                    name='tax1' value={this.state.tax['tax1']} id='tax1' 
                                    onChange={this.handleTaxChange}   style={{width: "25%"}}  
                                />
                                 <label htmlFor='tax1'>TAX type - TAX amount</label>
                            </div>
                            {/* TAX ROWS */}
                            {taxRows && taxRows.map(taxRow => {
                                return taxRow;
                            })}
                            <div stle={{display: 'flex'}}>
                                <button className="btn-floating btn-small red" 
                                style={{marginRight: 10}} onClick={this.handleAddTaxRow}
                                ><i className="material-icons">add</i></button>
                                <button className="btn-floating btn-small red" 
                                onClick={this.handleRemoveTaxRow} ><i className="material-icons">remove</i></button>
                            </div>
                            <div className="input-field">
                                <label htmlFor="comment">Comment</label>
                                <textarea id='comment' className='materialize-textarea' onChange={this.handleChange}></textarea>
                            </div>
                            <div className="input-field">
                                <button className="btn red lighten-1 z-depth-0" disabled={!this.disableSend()}>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        } else {
            return ( 
                <div className="container center">
                    <p>Loading...</p>
                </div>
            );
        }
        
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'users', where: [
            'isAcc', '==', false
        ] }
    ])
)(NewSettlement);






