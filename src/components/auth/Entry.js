import React from 'react';

import { SignInDialogEntry } from './SignInDialogEntry';
import SignUpDialogEntry from './SignUpDialogEntry';


const Entry = () => {
    return (
        <div className="card white inup-intro">
            <span className="card-title teal-text text-darken-4 center inup-intro-title">E-Accountant</span>
            
                <p className="grey-text center">Login to your account or Sign Up!</p>
                
                <SignInDialogEntry />
                <SignUpDialogEntry />
      
        </div>
    );
}

export default Entry;