import React from 'react';
import { NavLink } from 'react-router-dom';
import NewInvoiceMenu from '../projects/NewInvoiceMenu';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';


const SignedInLinks = (props) => {

    return (
        <ul className="right">
            <NewInvoiceMenu /> {/* DO WYJEBANIA TYLKO CREATE */}
            {/* connect to firestore if user id / user isAcc == true to jedno jak nie to drugie */}
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

export default connect(null, mapDispatchToProps)(SignedInLinks);