import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateUser } from '../../store/actions/authActions'


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
    handleUpdate = (e) => {
        e.preventDefault();
        this.props.updateUser(this.props.auth.uid, this.state);
        this.props.history.push('/accountdetails/'+this.props.auth.uid);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    disableSend = () => {
        const validationData = {
            clientName: this.state.clientName,
            adress: this.state.adress,
            legalForm: this.state.legalForm,
            nip: this.state.nip,
            regon: this.state.regon
        };
        let values = Object.values(validationData);
        return values.some(value => value.length < 1)
        
    }

    render() {
        const { auth } = this.props;
        if (!auth.uid) return <Redirect to='/' />
        
        if (this.props.users && auth) {
            const userInfo = this.props.users[auth.uid];
            if(userInfo) {
                return (
                    <div className="container section">
                        <div className="card z-depth-0" style={{transform: 'scale(1)', margin: 100}}>
                            <div className="card-content" >
                                <form onSubmit={this.handleUpdate} className="update-form" >
                                <h5 className="red-text text-lighten-1">Zaktualizuj Profil</h5>
                                    <div className="input-field">
                                        <label htmlFor="clientName">Imię</label>
                                        <input type="text" id="clientName" onChange={this.handleChange} value={this.state.clientName} /> 
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="adress">Adres</label>
                                        <textarea id="adress" className='materialize-textarea' onChange={this.handleChange} value={this.state.adress} />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="legalForm">Forma prawna (sp. z.o.o., sp. jawna...)</label>
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
                                        <label htmlFor="phoneNumber">Numer telefonu</label>
                                        <input type="text" id="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber}/> 
                                    </div>
                                    <div className="input-field">
                                        <button className="btn red lighten-1 z-depth-0" disabled={this.disableSend()}>ZAPISZ</button>
                                    </div>
                                </form>

                                
                            </div>
                        </div>      
                    </div>
                );
            } else {
                return (
                    <div className="container center">
                        <p>Ładowanie...</p>
                    </div>
                );
            }
            
        } else {
            return (
                <div className="container center">
                    <p>Ładowanie...</p>
                </div>
            );
        }   
    
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        users: state.firestore.data.users
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (uid, userData) => dispatch(updateUser(uid, userData))
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