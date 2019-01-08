import React from 'react';
import { NavLink } from 'react-router-dom';


const Entry = () => {
    return (
        <div className="card white inup-intro">
            <span className="card-title teal-text text-darken-4 center inup-intro-title">E-Accountant</span>
            
                <p className="grey-text center">Login to your account or Sign Up!</p>
                <NavLink className="waves-effect waves-light btn teal darken-4" to='/signup'>Signup</NavLink>
                <NavLink className="waves-effect waves-light btn teal darken-4" to='/signin'>Login</NavLink>
            
      
        </div>
    );
}

export default Entry;