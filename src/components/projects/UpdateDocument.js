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
            return {...props.invoice};
        } else {
            return state;
        }
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        
    }

    render() {
        
        //check if user is logged in
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />

        if (this.props.invoice) {
            const { invoice } = this.props;
            console.log('render props')
            console.log(this.state);

            

            return (
                <div>
                    <div className="container">
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
                                <input type="text" id="title" onChange={this.handleChange} /> 
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
                            {/* <div className="input-field">

                                <Dropzone accept="image/*,application/pdf"
                                    onDrop={this.onDrop}
                                    maxSize={6291456}
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
                                <button className="btn red lighten-1 z-depth-0" disabled={this.disableSend()}>Send</button>
                            </div> */}
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


