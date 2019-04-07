import React, { Component } from 'react';
import { ButtonBase, Dialog } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



const styles = theme => ({
    deleteButton: {
        backgroundColor: '#ef5350',
        color: 'white',
        padding: '7px',
        marginTop: '5px',
        transition: 'background-color .1s',
        '&:hover': {
            backgroundColor: '#f44336'
        },
        '&:focus' : {
            backgroundColor: '#ef5350'
          }
    },
    deleteYesNo: {
        margin: '5px',
        backgroundColor: '#ef5350',
        color: 'white',
        padding: '7px',
        marginTop: '5px',
        width: '100px',
        transition: 'background-color .1s',
        '&:hover': {
            backgroundColor: '#f44336'
        },
        '&:focus' : {
            backgroundColor: '#ef5350'
          }
    }
})

class DeleteInvoiceDialog extends Component {
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
            <div>
                <ButtonBase
                onClick={this.handleOpen}
                disableRipple={true}
                focusRipple={false}
                className={classes.deleteButton}
                >
                    Usuń Fakturę
                </ButtonBase>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth='xl'
               
                >
                    <div className="card z-depth-0 invoice-delete-card">
                        <span className="card-title center">USUŃ</span>
                        <p>Czy na pewno chcesz usunąć dokument?</p>
                        <div className="deleteYesNo">
                            <ButtonBase
                                onClick={this.props.handleDelete}
                                disableRipple={true}
                                focusRipple={false}
                                className={classes.deleteYesNo}
                                >
                                    Tak
                                </ButtonBase>
                                <ButtonBase
                                onClick={this.handleClose}
                                disableRipple={true}
                                focusRipple={false}
                                className={classes.deleteYesNo}
                                >
                                    Nie
                                </ButtonBase>
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }

}

DeleteInvoiceDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    
  };

export default withStyles(styles)(DeleteInvoiceDialog);