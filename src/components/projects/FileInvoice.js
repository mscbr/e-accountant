import React, { Component } from 'react';
import { FilePond, File, registerPlugin } from 'react-filepond';
import { Redirect } from 'react-router-dom';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

import { connect } from 'react-redux';
import { createInvoice } from '../../store/actions/invoiceActions';

registerPlugin(FilePondPluginFileValidateType);

export class FileInvoice extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            comment: '',
            files: []
        }
    }
   
    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    handleChange = (e) => {
        
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleFile = (fileItems) => {
        this.setState({
            files: fileItems.map(fileItem => fileItem.file)
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createInvoice(this.state);
        this.props.history.push('/dashboard');
    }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/' />
    return (
      <div>
        <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Send New Invoice</h5>
                <div className="input-field">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="date">Date of issue</label>
                    <input type='date' id='date' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="" id="upload" className="active">Upload</label>
                    <FilePond className='filepond' labelIdle="Drag & Drop your invoice or <span class='filepond--label-action'> Browse </span>"
                        maxFiles={3}
                        allowMultiple={true}
                        onupdatefiles={this.handleFile} 
                        server="gs://e-accountant-b98af.appspot.com"
                        oninit={() => this.handleInit() }
                        allowFileTypeValidation={true}
                        acceptedFileTypes={['image/*', 'application/pdf']}
                        labelFileTypeNotAllowed='File of invalid type'
                        >
                    {this.state.files.map(file => (
                    <File key={file} src={file} origin="local" />
                        ))}
                    </FilePond>
                        
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createInvoice: (invoice) => dispatch(createInvoice(invoice))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileInvoice);
