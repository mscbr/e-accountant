import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';



export class CreateProject extends Component {
    state = {
        title: '',
        date: '',
        comment: '',
        file: null

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
                <h5 className="grey-text text-darken-3">Send new invoice</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="datepicker">Date of issue</label>
                    <input type='date' id='date' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="" id="upload" className="active">Upload</label>
                    <FilePond className='filepond' labelIdle="Drag & Drop your invoice or <span class='filepond--label-action'> Browse </span>"
                        onupdatefiles={this.handleFile} />
                </div>
                <div className="input-field">
                    <label htmlFor="comment">Comment</label>
                    <textarea id='comment' className='materialize-textarea' onChange={this.handleChange}></textarea>
                </div>
                <div className="input-field">
                    <button className="btn red lighten-1 z-depth-0">Send</button>
                </div>
            </form>
        </div>
      </div>
    )
  }
}

export default CreateProject
