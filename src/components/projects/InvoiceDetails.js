import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'; 
import firebase from "firebase";
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import moment from 'moment';
import DeleteInvoiceDialog from './DeleteInvoiceDialog'
import { deleteInvoice } from '../../store/actions/invoiceActions';
import { Link } from 'react-router-dom';

//invoice files previews styling variables
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
};

const uploadButtonStyle = {
    position: 'absolute',
    width: '25px',
    height: '25px',
    zIndex: 2,
    marginTop: 0,
    textAlign: 'center'
    
};
const commentsBoxStyle = {
    width: '99%',
    minHeight: 100,
    padding: 10,
    border: '1px dashed grey',
    borderRadius: '10px'
}
const updateButtonStyle = {
    backgroundColor: '#ef5350',
    color: 'white',
    paddingTop: '5px',
    paddingLeft: '7px',
    paddingRight: '7px',
    marginTop: '5px',
    marginLeft: '5px',
    transition: 'background-color .1s',
    '&:hover': {
        backgroundColor: '#f44336'
    },
    '&:focus' : {
        backgroundColor: '#ef5350'
      }
}
class InvoiceDetails extends Component {
    constructor(props) {
        super(props);
    }

    handleDelete = () => {
        //deleting invoice from database
        this.props.deleteInvoice(this.props.invoiceId);
        //deleting invoice files from storage
        const filesName = this.props.invoice.filesName;
        if(filesName) {
            filesName.map(file => {
                firebase 
                    .storage()
                    .ref('uploaded')
                    .child(file)
                    .delete()
                    .then(() => {
                        console.log(file+" succesfully deleted")
                    }).catch((err) => {
                        console.log(err);
                    })
            });
        }
        
        //redirecting after delete
        this.props.history.push('/dashboard');
        
    }

    createDownloadButton = (fileURL, id) => {
       
        const xhr = new XMLHttpRequest();
        xhr.open('GET', fileURL, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            //const blob = xhr.response;
            const blobURL = URL.createObjectURL(xhr.response);
            const downloadButton = document.getElementById(id);
            downloadButton.href = blobURL;
        };
        
        xhr.send();

    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />

        const { invoice } = this.props;
        // console.log(invoice);
        // console.log(this.props);
     
        if (invoice && invoice.filesName) {
            const previews = invoice.filesUrl; 
            const thumbs = invoice.filesName.map(fileName => {
                    return (
                        <div style={thumb} key={fileName}>
                        
                            <div style={thumbInner}>
                                
                                <img
                                    src={previews[fileName]}
                                    style={img}
                                    alt={fileName}
                                />
                                <a 
                                    id={fileName}
                                    download
                                    style={uploadButtonStyle}
                                    className="btn-floating btn-small red lighten-1" 
                                    >
                                    <i style={{marginTop: -7}} className="material-icons">get_app</i>
                                </a>
                                {this.createDownloadButton(previews[fileName], fileName)}
                            </div>
                            
                        </div>
                    );
                });
            
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{invoice.title}</span>
                            <p className="grey-text">Files for period: {invoice.issuePeriod}</p>
                            <aside style={thumbsContainer}>
                                {thumbs}
                            </aside>
                            <p>Comments:</p>
                            <div className="comments-box" style={commentsBoxStyle}>
                                <p>{invoice.comment}</p>
                            </div>
                            <div className="bottom-btn-container" style={{display: 'flex'}}>
                                <DeleteInvoiceDialog handleDelete={this.handleDelete} />
                                <Link to={'/project/update/'+this.props.match.params.id} key={invoice.id}
                                    style={updateButtonStyle}
                                >Update</Link>
                            </div>
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted by the {invoice.clientName}</div>
                            <div>{moment(invoice.createdAt.toDate()).calendar()}</div>
                            
                        </div>
                    </div>
                </div>
            )
        } else if (invoice) {
            return (
                <div className="container section project-details">
                    <div className="card z-depth-0">
                        <div className="card-content">
                            <span className="card-title">{invoice.title}</span>
                            <p>Comments: {invoice.comment}</p>
                            <DeleteInvoiceDialog handleDelete={this.handleDelete} />
                        </div>
                        <div className="card-action grey lighten-4 grey-text">
                            <div>Posted by the {invoice.clientName}</div>
                            <div>{moment(invoice.createdAt.toDate()).calendar()}</div>
                            
                        </div>
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
    return {
        invoice: invoice,
        invoiceId: ownProps.match.params.id,
        auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteInvoice: (invoiceId) => dispatch(deleteInvoice(invoiceId))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'invoices', where: [
            'userId', '==', props.auth.uid ? props.auth.uid : null
        ] }
    ])
)(InvoiceDetails);
