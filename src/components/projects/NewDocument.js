import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from "firebase";
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux';
import { createInvoice } from '../../store/actions/invoiceActions';


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


export class NewDocument extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            docType: 'invalid',
            title: '',
            issueDate: '',
            comment: '',
            filesName: [],
            filesUrl: {},
            //data that is not passed 
            uploadProgress: 0

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
            filesName: this.state.filesName,
            filesUrl: this.state.filesUrl
        }
        console.log(invoiceData);
        console.log('====');
        //this.props.createInvoice(this.state);
        //this.props.history.push('/dashboard');
        console.log(this.state);
    }

    //FILE UPLOAD METHODS

    onDrop = (acceptedFiles, rejectedFiles) => {

        acceptedFiles.map(file => {
            const fileName = new Date().getTime() + '_' +file.name;
            firebase
                .storage()
                .ref('uploaded')
                .child(fileName)
                .put(file)
                .on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    (snapshot) => {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        this.setState({
                            uploadProgress: progress
                        });
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, (error) => {
                        console.log(error);
                    }, () => {
                        firebase
                            .storage()
                            .ref('uploaded')
                            .child(fileName)
                            .getDownloadURL().then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                this.setState({
                                    filesName: [...this.state.filesName, fileName],
                                    filesUrl: Object.assign(this.state.filesUrl, {
                                        [fileName]: downloadURL
                                    })
                                    
                                })
                            });
                        }
                )
        })
    }

    handleDelete = (e) => {
        e.preventDefault();
        //console.log('deleted!');
        const filesName = this.state.filesName;
        filesName.map(file => {
            firebase
                .storage()
                .ref('uploaded')
                .child(file)
                .delete()
                .then(() => {
                    this.setState({
                        filesName: [],
                        filesUrl: {},
                        uploadProgress: 0
                    })

                    console.log('files deleted successfully!');
                }).catch((error) => {
                    console.log(error);
                });
        })
        
    }

    render() {
        const previews = this.state.filesUrl;
        const {filesName} = this.state;
        let uploadProgress = Math.floor(this.state.uploadProgress);

        const thumbs = filesName ? filesName.map(fileName => {
            return (
                <div style={thumb} key={fileName}>
                    <div style={thumbInner}>
                        <img
                            src={previews[fileName]}
                            style={img}
                            alt={fileName}
                        />
                        
                    </div>
                </div>
            );
        }) : console.log('uploading');
        const deleteButton = uploadProgress > 0 ? (
            <button className="btn-floating red lighten-1" style={deleteButtonStyle} onClick={(e) => this.handleDelete(e)}>
                <i className="small material-icons" style={{marginTop: -7}}>delete</i>
            </button>
        ) : console.log('nothing to delete!');

        
                
            
        

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
                        <aside style={thumbsContainer}>
                            {thumbs} 
                            {deleteButton}
                            
                            <p>{uploadProgress < 100 && uploadProgress > 0 ? `uploading...${uploadProgress}%` : ''}</p>
                            
                        </aside>
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


