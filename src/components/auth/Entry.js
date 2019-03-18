import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { SignInDialogEntry } from './SignInDialogEntry';
import SignUpDialogEntry from './SignUpDialogEntry';


const Entry = (props) => {
    const { auth } = props;
    if (auth.uid) return <Redirect to='/dashboard' />
    return (
        <div className="card white inup-intro">
            <span className="card-title center inup-intro-title">E-Accountant</span>
            
                <p className="grey-text center">Login to your account or Sign Up!</p>
                
                <SignInDialogEntry />
                <SignUpDialogEntry />
      
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Entry);