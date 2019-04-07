import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


const SignedInLinksAccountant = (props) => {

    return (
        <ul className="right">
            <li><NavLink to='/accpanel'>Kokpit</NavLink></li>
            <li><NavLink to='/clients'>Klienci</NavLink></li>
            <li><NavLink to='/newsettlement'>Nowe Rozliczenie</NavLink></li>
            <li><a onClick={props.signOut}>Wyloguj</a></li>
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