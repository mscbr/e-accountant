import React, { Component } from 'react'

import { ButtonBase, Dialog } from '@material-ui/core'

import SignUp from './SignUp';

export class SignUpDialogEntry extends Component {
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
  
    return (
      <div  >
        <ButtonBase
          onClick={this.handleOpen}
          className="waves-effect waves-light teal darken-4 btn white-text"
          style={{width: '100%'}}
          
        >
          Signup
        </ButtonBase>
        <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth='xl'
        
        >
            <SignUp closeDialog={this.handleClose} />
        </Dialog>
      </div>
    )
  }
}

export default SignUpDialogEntry;

