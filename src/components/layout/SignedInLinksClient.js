import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


const SignedInLinksClient = (props) => {

    return (
        <ul className="right">
            <li><NavLink to='/'>Dashboard</NavLink></li>
            <li><NavLink to='/'>My Documents</NavLink></li>
            <li><NavLink to='/newdocument'>New Document</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating blue lighten-2'>
                {props.profile.initials}
            </NavLink></li>
        </ul>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinksClient);