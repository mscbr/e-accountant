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
        this.state = {
            docType: '',
            title: '',
            issuePeriod: '',
            comment: '',
            filesName: [],
            filesUrl: {},
            //data that is not passed 
            issueYear: '',
            issueMonth: '',
            uploadProgress: 0
        };  
        
    }
    static getDerivedStateFromProps = (props, state) => {
        
        
        if (props.invoice && state.docType === '') {
            return {
                ...props.invoice,
                uploadProgress: 100,
                issueYear: props.invoice.issuePeriod.substring(0,4),
                issueMonth: props.invoice.issuePeriod.substring(5,8)
            };
        } else {
            return state;
        }
        
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
    handlePeriodSet = (year, month) => {
        if(year && month) {
            this.setState({
                issuePeriod: year+'-'+month
            });
        } else {
            this.setState({
                issuePeriod: ''
            })
        }
    }

    //FILE UPLOAD METHOD
    onDrop = (acceptedFiles, rejectedFiles) => {
        if(rejectedFiles.length) {
            const rejectedString = rejectedFiles.map(file => {
                return "File "+file.name+" was not able to be uploaded.";
            })
            alert(rejectedString);
        }
        
        const metadata = {
            customMetadata: {
                fileOwner: firebase.auth().currentUser.uid
            }
            
        };
        
        acceptedFiles.map(file => {
            const fileName = new Date().getTime() + '_' +file.name;
            firebase
                .storage()
                .ref('uploaded')
                .child(fileName)
                .put(file, metadata)
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
                                
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                               
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
                                //console.log('File available at', downloadURL);
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
                    }, () => {
                        firebase.firestore().collection('invoices').doc(this.props.match.params.id).update({
                            filesName: [],
                            filesUrl: {},
                            uploadProgress: 0
                        })
                    })

                    console.log('files deleted successfully!');
                }).catch((error) => {
                    console.log(error);
                });
        });
        this.setState({
            filesName: [],
            filesUrl: {},
            uploadProgress: 0
        })
        
    }
    disableSend = () => {
        const validationData = {
            docType: this.state.docType,
            title: this.state.title,
            issueYear: this.state.issueYear,
            issueMonth: this.state.issueMonth,
            filesName: this.state.filesName,
            filesUrl: this.state.filesUrl
        };
        let values = Object.values(validationData);
        return values.some(value => value.length < 1)
        
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        //FILTER OUT PASSED DATA
        const invoiceData = {
            docType: this.state.docType,
            title: this.state.title,
            issuePeriod: this.state.issueYear+'-'+this.state.issueMonth,
            comment: this.state.comment,
            filesName: this.state.filesName,
            filesUrl: this.state.filesUrl
        }
        
        this.props.updateInvoice(this.props.match.params.id, invoiceData);
        this.props.history.push('/project/'+this.props.match.params.id);
    }

    render() {
        
        //check if user is logged in
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />

        if (this.props.invoice) {
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
            const deleteButton = this.state.uploadProgress ? (
                <button className="btn-floating red lighten-1" style={deleteButtonStyle} onClick={(e) => this.handleDelete(e)}>
                    <i className="small material-icons" style={{marginTop: -7}}>delete</i>
                </button>
            ) : null;
            

            return (
                <div>
                    <div className="container update-form">
                        <form onSubmit={this.handleSubmit} className="white">
                            <h5 className="grey-text text-darken-3">Update Invoice</h5>
                            <div className="input-field">
                                <select className="browser-default" name="docType" id="docType"  onChange={this.handleChange} value={this.state.docType} >
                                    <option value="" defaultValue disabled>Type of Document</option>
                                    <option value="sale">Sale Invoice</option>
                                    <option value="expence">Expence Invoice</option>
                                    <option value="other">Other Document</option>    
                                </select>
                            </div>
                            <div className="input-field">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" onChange={this.handleChange} value={this.state.title}/> 
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
                                        Period of attached documents issue
                                </label>
                            </div>
                            <div className="input-field">

                                <Dropzone accept="image/*,application/pdf"
                                    onDrop={this.onDrop}
                                    maxSize={6291456}
                                >
                                    {({getRootProps, getInputProps, isDragActive}) => {
                                        if (!this.state.filesName.length) {
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
                                        } else {
                                            return (
                                                <div></div>
                                            )
                                        }
                                        
                                    }}
                                </Dropzone>
                                <aside style={thumbsContainer}>
                                    {thumbs} 
                                    {deleteButton}
                                    <p className="red-text text-lighten1">* files will be deleted permanently & instantly</p>
                                    
                                    <p>{uploadProgress < 100 && uploadProgress > 0 ? `uploading...${uploadProgress}%` : ''}</p>
                                    
                                </aside>
                            </div>
                            <div className="input-field">
                                <label htmlFor="comment">Comment</label>
                                <textarea id='comment' 
                                    className='materialize-textarea' 
                                    onChange={this.handleChange}
                                    value={this.state.comment}
                                ></textarea>
                            </div>
                            <div className="input-field">
                                <button className="btn red lighten-1 z-depth-0" disabled={this.disableSend()}>SAVE</button>
                            </div>
                        </form>
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
    const id = ownProps.match.params.id;
    const invoices = state.firestore.data.invoices;
    const invoice = invoices ? invoices[id] : null;
    // console.log("ownProps");
    // console.log(ownProps);
    return {
        auth: state.firebase.auth,
        invoiceId: id,
        invoice: invoice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateInvoice: (invoiceId, invoice) => dispatch(updateInvoice(invoiceId, invoice))
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


