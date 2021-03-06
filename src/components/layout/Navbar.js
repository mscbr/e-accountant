import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinksAccountant from './SignedInLinksAccountant';
import SignedInLinksClient from './SignedInLinksClient';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = (props) => {
    const { auth, profile } = props;
    
    const links = auth.uid ? (
            profile.isAcc ? <SignedInLinksAccountant profile={profile} /> : <SignedInLinksClient profile={profile} />
        ) : <SignedOutLinks />;
    return (
        <nav className="nav-wrapper  nav-bar">
            <div className="container">
                <Link to='/dashboard' className='brand-logo white-text hide-on-med-and-down'>E-Accountant</Link>
                {/* <Link to='/dashboard' className='dashboard-icon left white-text hide-on-large-only'>
                <i className='material-icons'>dashboard</i></Link> */}
                { links }
            </div>
        </nav>
    );
}

const mapStateToProps = (state) => {
    //console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);