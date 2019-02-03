import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createInvoice } from '../../store/actions/invoiceActions';
//filePond import
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';



registerPlugin(FilePondPluginFileValidateType);

export class NewDocument extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            docType: 'invalid',
            title: '',
            issueDate: '',
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
        fileItems.map(file => {
            console.log(file.file);
        })
        this.setState({
            files: fileItems.map(fileItem => fileItem.file)
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //different actons x doc type
        
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
                        <select className="browser-default" name="docType" id="docType" onChange={this.handleChange} value={this.state.docType} >
                            <option value="invalid" defaultValue disabled>Type of Document</option>
                            <option value="sale">Sale Invoice</option>
                            <option value="expence">Expence Invoice</option>
                            <option value="other">Other Document</option>    
                        </select>
                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} /> 
                    </div>
                    <div className="input-field">
                        <label htmlFor="issueDate">Date of issue</label>
                        <input type='date' id='issueDate' onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="" id="upload" className="active">Upload</label>
                        <FilePond className='filepond' labelIdle="Drag & Drop your invoice or <span class='filepond--label-action'> Browse </span>"
                            maxFiles={3}
                            allowMultiple={true}
                            onupdatefiles={this.handleFile} 
                            
                            
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

export default connect(mapStateToProps, mapDispatchToProps)(NewDocument);


