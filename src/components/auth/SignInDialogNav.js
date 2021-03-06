import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonBase, Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import SignIn from './SignIn';

const styles = theme => ({
    button: {
      height: '60px',
      marginTop: '-3px',
      padding: 0,
      transition: 'background-color .3s',
      '&:hover' : {
        backgroundColor: 'rgba(0,0,0,0.1)'
      },
      '&:focus' : {
        backgroundColor: 'rgba(64, 70, 84, 0.88)'
      }
    },
    dialog: {
      
    },
    
  });

class SignInDialogNav extends Component {
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
          Login
        </ButtonBase>
        <Dialog
        className={classes.dialog}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth='xl'
        >
            <SignIn closeDialog={this.handleClose} />
        </Dialog>
      </li>
    )
  }
}

SignInDialogNav.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = (state) => {
  //console.log(state);
  return {
    //isLogged: !state.firebase.auth.isEmpty
    
  }
}

export default connect(mapStateToProps)(withStyles(styles)(SignInDialogNav));

