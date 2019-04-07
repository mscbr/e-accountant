import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


const SignedInLinksClient = (props) => {
    
    return (
        <ul className="right">
            <li><NavLink to='/dashboard'>Kokpit</NavLink></li>
            <li><NavLink to='/newdocument'>Nowy Dokument</NavLink></li>
            <li><a onClick={props.signOut}>Wyloguj</a></li>
            <li><NavLink to={'/accountdetails/'+props.auth.uid} className='btn btn-floating blue lighten-2'>
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinksClient);