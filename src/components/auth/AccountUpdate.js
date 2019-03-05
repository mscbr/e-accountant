import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { deleteUser } from '../../store/actions/authActions'


class AccountUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientName: '',
            adress: '',
            legalForm: '',
            nip: '',
            regon: '',
            phoneNumber: ''
        }
    }
    static getDerivedStateFromProps = (props, state) => {
        if (props.users && state.clientName === '') {
            return {
                ...props.users[props.match.params.uid]
            }
        } else {
            return state;
        }
    }
    handleUpdate = () => {
        console.log(this.props);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        
        if (this.props.users && auth) {
            const userInfo = this.props.users[auth.uid];
            if(userInfo) {
                return (
                    <div className="container section">
                        <div className="card z-depth-0" style={{transform: 'scale(1.1)', margin: 100}}>
                            <div className="card-content" >
                                <form onSubmit={this.handleUpdate} className="update-form" >
                                <h5 className="grey-text text-darken-3">Update Profile Details</h5>
                                    <div className="input-field">
                                        <label htmlFor="clientName">Name</label>
                                        <input type="text" id="clientName" onChange={this.handleChange} value={this.state.clientName} /> 
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="adress">Adress</label>
                                        <textarea id="adress" className='materialize-textarea' onChange={this.handleChange} value={this.state.adress} />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="legalForm">Legal Form (sp. z.o.o., sp. jawna...)</label>
                                        <input type="text" id="legalForm" onChange={this.handleChange} value={this.state.legalForm}/> 
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="nip">NIP</label>
                                        <input type="number" id="nip" onChange={this.handleChange} value={this.state.nip} /> 
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="regon">REGON</label>
                                        <input type="number" id="regon" onChange={this.handleChange} value={this.state.regon} /> 
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="phoneNumber">Phone no.</label>
                                        <input type="text" id="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber}/> 
                                    </div>
                                </form>

                                {/* <span className="card-title">{userInfo.clientName}</span>
                                <p className="grey-text">Email: <span className="grey-text text-darken-2">{auth.email}</span></p>
                                <p className="grey-text">Adress: <span className="grey-text text-darken-2">{userInfo.adress}</span></p>
                                <p className="grey-text">Legal form: <span className="grey-text text-darken-2">{userInfo.legalForm}</span></p>
                                <p className="grey-text">NIP: <span className="grey-text text-darken-2">{userInfo.nip}</span></p>
                                <p className="grey-text">REGON: <span className="grey-text text-darken-2">{userInfo.regon}</span></p>
                                <p className="grey-text">Phone: <span className="grey-text text-darken-2">{userInfo.phoneNumber}</span></p> */}
                            </div>
                        </div>      
                    </div>
                );
            } else {
                return (
                    <div className="container center">
                        <p>Loading...</p>
                    </div>
                );
            }
            
        } else {
            return (
                <div className="container center">
                    <p>Loading...</p>
                </div>
            );
        }   
    
    }
}

const mapStateToProps = (state) => {
    // console.log('state');
    // console.log(state.firebase.auth);
    
    return {
        auth: state.firebase.auth,
        users: state.firestore.data.users
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: () => dispatch(deleteUser())
    };
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { 
            collection: 'users',
            doc: props.auth.uid
        }
    ])
)(AccountUpdate);