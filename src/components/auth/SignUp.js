import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';



export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            clientName: '',
            adress: '',
            legalForm: '',
            nip: '',
            regon: '',
            phoneNumber: '',
            accountant: "false"
        }
    }
    
   
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state);
    }
    disableSubmit = () => {
        //check if any value in this.state is 'empty'
        let values = Object.values(this.state);
        return values.some(value => value.length < 1);
      
    }
  render() {
    const { auth, authError } = this.props;
    if(auth.uid) return <Redirect to='/dashboard' />
   
    return (
      
      <div id="signup-form">
            <form onSubmit={this.handleSubmit} className="white form-sign">
                <h5 className="grey-text text-darken-3">Rejestracja</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="clientName">Imię</label>
                    <input type="text" id="clientName" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="adress">Adres</label>
                    <textarea id="adress" className='materialize-textarea' onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="legalForm">Forma prawna (sp. z.o.o., sp. jawna...)</label>
                    <input type="text" id="legalForm" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="nip">NIP</label>
                    <input type="number" id="nip" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="regon">REGON</label>
                    <input type="number" id="regon" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="phoneNumber">Numer telefonu</label>
                    <input type="text" id="phoneNumber" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <select className="browser-default" name="accountant" id="accountant" onChange={this.handleChange} value={this.state.accountant} >
                        <option value="false" defaultValue >Klient</option>
                        <option value="true" disabled>Księgowy</option>  
                    </select>
               
                </div>
                <div className="input-field">
                    <button type='submit' disabled={this.disableSubmit()} className="btn red lighten-1 z-depth-0" >Zarejestruj</button>
                    <div className="red-text center">
                        { authError ? <p>{ authError } </p> : null }
                    </div>
                </div>
            </form>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser => dispatch(signUp(newUser)))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
