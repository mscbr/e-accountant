import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = () => {
    return (
        <nav className="nav-wrapper teal darken-3">
            <div className="container">
                <Link to='/dashboard' className='brand-logo white-text'>E-Accountant</Link>
                <SignedInLinks />
                <SignedOutLinks />
            </div>
        </nav>
    );
}

export default Navbar;