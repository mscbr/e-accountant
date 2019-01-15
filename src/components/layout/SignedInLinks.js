import React from 'react';
import { NavLink } from 'react-router-dom';
import NewInvoiceMenu from '../projects/NewInvoiceMenu';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


const SignedInLinks = (props) => {

    return (
        <ul className="right">
            <NewInvoiceMenu />
            <li><a onClick={props.signOut}>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating red lighten-2'>NN</NavLink></li>
        </ul>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);