import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ButtonBase, Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import SignUp from './SignUp';

const styles = theme => ({
    button: {
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
    }
  });

export class SignUpDialogNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    handleOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    }

  render() {
    const { classes } = this.props;
    return (
      <li>
        <ButtonBase
          onClick={this.handleOpen}
          className={classes.button}
          disableRipple={true}
        >
          SignUp
        </ButtonBase>
        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        
        maxWidth='xl'
        >
            <SignUp closeDialog={this.handleClose} />
        </Dialog>
      </li>
    )
  }
}

SignUpDialogNav.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(SignUpDialogNav);

