import React from 'react';
import { NavLink } from 'react-router-dom';

import NewInvoiceMenu from '../projects/NewInvoiceMenu';


const SignedInLinks = () => {
    return (
        <ul className="right">
            
            {/* <li><NavLink to='/newinvoice'>New Invoice</NavLink></li> */}
            <li><NewInvoiceMenu /></li>
            <li><NavLink to='/'>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating red lighten-2'>NN</NavLink></li>
          
        </ul>
    );
}

export default SignedInLinks;