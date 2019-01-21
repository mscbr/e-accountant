import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


const SignedInLinksAccountant = (props) => {

    return (
        <ul className="right">
            <li><NavLink to='/'>Dashboard</NavLink></li>
            <li><NavLink to='/'>Clients</NavLink></li>
            <li><NavLink to='/newdocument'>New Tax Deduction</NavLink></li>
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating red lighten-2'>
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

export default connect(null, mapDispatchToProps)(SignedInLinksAccountant);