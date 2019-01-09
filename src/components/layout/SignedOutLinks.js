import React from 'react';
import { NavLink } from 'react-router-dom';
import SignUpDialog from '../auth/SignUpDialog';
import SignInDialog from '../auth/SignInDialog';




const SignedOutLinks = () => {
    return (
        <ul className="right">
            {/* <li><NavLink to='/signup'>Signup</NavLink></li> */}
            <SignUpDialog />
            <SignInDialog />
        </ul>
    );
}

export default SignedOutLinks;