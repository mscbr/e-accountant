import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from "firebase";
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';
import { createInvoice } from '../../store/actions/invoiceActions';


export class NewDocument extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            docType: 'invalid',
            title: '',
            issueDate: '',
            comment: '',
            fileName: '',
            fileUrl: '',
            //data that is not passed 
            isUploading: false,
            progress: 0
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        //FILTER OUT PASSED DATA
        const invoiceData = {
            docType: this.state.docType,
            title: this.state.title,
            issueDate: this.state.issueDate,
            comment: this.state.comment,
            fileName: this.state.fileName,
            fileUrl: this.state.fileUrl
        }
        console.log(invoiceData);
        console.log('====');
        //this.props.createInvoice(this.state);
        //this.props.history.push('/dashboard');
        console.log(this.state);
    }
    //FILE UPLOAD METHODS
    onDrop = (acceptedFiles, rejectedFiles) => {
        console.log('ACCEPTED:');
        console.log(acceptedFiles);
        console.log('REJECTED:');
        console.log(rejectedFiles);

        acceptedFiles.map(file => {
            firebase
                .storage()
                .ref('uploaded')
                .child(new Date().getTime() + '_'+file.name)
                .put(file);
                
        })
        // firebase
        //     .storage()
        //     .ref('uploaded')
        //     .child(acceptedFiles.filename)
        //     .getDownloadURL()
        //     .then((url) => {
        //         console.log('URL: '+url);
        //         //this.setState({ fileUrl: url });
        //     });
    }


    // handleUploadStart = () => {
    //     this.setState({
    //         isUploading: true
    //     });
    // }
    // handleProgress = (progress) => {
    //     this.setState({ progress });
    // }
    // handleUploadError = (error) => {
    //     this.setState({ isUploading: false });
    //     console.log(error);
    // }
    // handleUploadSucces = (filename) => {
    //     this.setState({
    //         fileName: filename,
    //         progress: 100,
    //         isUploading: false
    //     });
    //     firebase
    //         .storage()
    //         .ref('uploaded')
    //         .child(filename)
    //         .getDownloadURL()
    //         .then((url) => {
    //             console.log('URL: '+url);
    //             //this.setState({ fileUrl: url });
    //         });
    // }

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

                    <Dropzone accept="image/*,application/pdf"
                        onDrop={this.onDrop}
                    >
                        {({getRootProps, getInputProps, isDragActive}) => {
                            return (
                                <div 
                                    {...getRootProps()}
                                    className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
                                >
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                        <p>Drop files here...</p> :
                                        <p>Drop your invoice files here (image/pdf)</p>
                                    }
                                </div>
                            )
                        }}
                    </Dropzone>





                        {/* <label htmlFor="" className="active">Upload:</label> */}
                        {/* {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                        {this.state.fileUrl && <img src={this.state.fileUrl} />}
                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={firebase.storage().ref("uploaded")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />     */}
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


