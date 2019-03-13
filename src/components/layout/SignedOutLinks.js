import React from 'react';

import SignUpDialogNav from '../auth/SignUpDialogNav';
import SignInDialogNav from '../auth/SignInDialogNav';




const SignedOutLinks = () => {
    return (
        <ul className="right">
            
            <SignUpDialogNav />
            <SignInDialogNav />
        </ul>
    );
}

export default SignedOutLinks;