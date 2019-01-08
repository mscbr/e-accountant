import React, { Component } from 'react';




export class SendInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            comment: ''
        }
    }
  

    handleChange = (e) => {
        console.log(this.props);
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleFile = (file) => {
        this.setState({
            file
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
  render() {
    return (
      <div>
        <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Create New Invoice</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="datepicker">Date of issue</label>
                    <input type='date' id='date' onChange={this.handleChange} />
                </div>
                
                <div className="input-field">
                    <label htmlFor="comment">Comment</label>
                    <textarea id='comment' className='materialize-textarea' onChange={this.handleChange}></textarea>
                </div>
                <div className="input-field">
                    <button className="btn red lighten-1 z-depth-0">Create</button>
                </div>
            </form>
        </div>
      </div>
    )
  }
}

export default SendInvoice
