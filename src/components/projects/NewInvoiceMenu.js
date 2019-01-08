import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



export class NewInvoiceMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const {anchorEl} = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'invoice-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          New Invoice
        </Button>
        <Menu
          id="invoice-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><NavLink to='/newinvoice/create'>Create New</NavLink></MenuItem>
          <MenuItem onClick={this.handleClose}><NavLink to='/newinvoice/send'>Send Existing</NavLink></MenuItem>
          
        </Menu>
      </div>
    );
  }
}

export default NewInvoiceMenu;

