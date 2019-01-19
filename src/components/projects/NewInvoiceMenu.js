import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ButtonBase, MenuList, MenuItem, Popper, Paper, Grow, ClickAwayListener} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  root: {
    height: '60px',
    marginTop: '-3px',
    padding: '0 15px',
    transition: 'background-color .3s',
    '&:hover' : {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    '&:focus' : {
      backgroundColor: '#00695c'
    }
  },
  menuList: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#00695c'
  }
});


export class NewInvoiceMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };


  render() {
    const { open } = this.state;
    const { classes } = this.props;
    
    return (
      <li>
        <ButtonBase
          buttonRef={node => {
              this.anchorEl = node;
            }}
          aria-owns={open ? 'invoice-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
          className={classes.root}
          disableRipple={true}
        >
          New Invoice
        </ButtonBase>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal className="zindex66">
            {({ TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                id="invoice-menu"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList className={classes.menuList}>
                    <MenuItem onClick={this.handleClose}><NavLink to='/newinvoice/create'>Create New</NavLink></MenuItem>
                    <MenuItem onClick={this.handleClose}><NavLink to='/newinvoice/send'>Send Existing</NavLink></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </li>
    );
  }
}

NewInvoiceMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NewInvoiceMenu);

