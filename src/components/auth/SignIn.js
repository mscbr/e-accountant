import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';

export class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.signIn(this.state);
        this.props.closeDialog();
        
    }
  render() {
      const { authError } = this.props;
    return (
      <div>
            <form onSubmit={this.handleSubmit} className="white form-sign">
                <h5 className="grey-text text-darken-3">Sign In</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={this.handleChange} /> 
                </div>
                <div className="input-field">
                    <button className="btn red lighten-1 z-depth-0" >Login</button>
                    <div className="red-text center">
                    { authError ? <p>{authError}</p> : null }
                    </div>
                </div>
            </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
