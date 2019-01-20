import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import BuyerSellerDataForm from './BuyerSellerDataForm';






export class CreateInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            dateIssue: '',
            comment: ''
        }
    }
   

    handleChange = (e) => {
       
        this.setState({
            [e.target.id]: e.target.value
        });
        console.log(this.state);
    }
   
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/' />
    return (
        <div className='container'>
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="teal-text text-darken-3">Create New Invoice</h5>
            <div id='invoice-info'>
                <div className='row'>
                    <div className='col s4'>
                        <select name='invoiceType' className="browser-default"
                        style={{transform: 'translateY(17px)'}}
                        id='invoiceType'
                        onChange={this.handleChange}
                        >
                            <option value="" disabled defaultValue >Type Of Document</option>
                            <option value="invoice-vat" >Faktura VAT</option>
                            <option value="proforma">Proforma</option>
                        </select>
                        {/* <label htmlFor='invoiceType'>Invoice Type</label> */}
                    </div>
                    <div className='input-field col s4'>
                        <label htmlFor='invoiceNumber'>Invoice Number</label>
                        <input id='invoiceNumber' type="text" onChange={this.handleChange} />   
                    </div>
                    <div className='col s4'>``
                        <label htmlFor="dateIssue"><i className='material-icons'>calendar_today</i>  Date of Issue   </label>
                        
                        <input type='date' id='dateIssue' onChange={this.handleChange} value={moment(this.state.dateIssue).format('YYYY-MM-DD')} />
                    </div>
                </div>
                <div className='row'>
                    <div className='red-text col s4'>for further developement</div>
                    <div className='input-field col s4'>
                        <label htmlFor='issueLocation'>Issue Location</label>
                        <input id='issueLocation' type="text" onChange={this.handleChange} />   
                    </div>
                    <div className='input-field col s4'>
                        <label htmlFor="dateTransaction"><i className='material-icons'>calendar_today</i>  Date of Transaction    
                        
                        </label>
                        
                        <input type='date' id='dateTransaction' onChange={this.handleChange} />
                    </div>
                </div>
            </div>
                <BuyerSellerDataForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
            <div className="input-field">
                    <button className="btn red lighten-1 z-depth-0">Create</button>
            </div>
        </form>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(CreateInvoice)
