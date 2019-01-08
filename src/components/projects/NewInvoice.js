import React from 'react';
import { NavLink } from 'react-router-dom';;

export default function NewInvoice() {
  return (
    
    <div className="card white newinvoice z-depth-0">
        <span className="card-title teal-text text-darken-4 center newinvoice">New Invoice</span>
        
        <p className="grey-text text-darken-2 center">Create New or Send already existing invoice</p>
        <NavLink className="waves-effect waves-light btn teal darken-4" to='/newinvoice/create'>Create New</NavLink>
        <NavLink className="waves-effect waves-light btn teal darken-4" to='/newinvoice/send'>Send Existing</NavLink>
    </div>
    
  )
}
