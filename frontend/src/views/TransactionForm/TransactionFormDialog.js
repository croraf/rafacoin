import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {TransactionForm} from './TranasactionForm';
import RemoteSubmitButton from './RemoteSubmitButton';


const styles = {
    paper: {
      maxWidth: '95%',
    }
};

class TransactionFormDialog extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render () {

        return (
            <>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth={true}
                    classes={{paper: this.props.classes.paper}}
                >
                    <DialogTitle>Make transaction</DialogTitle>

                    <DialogContent>
                        <TransactionForm/>
                    </DialogContent>

                    <DialogActions>
                        <RemoteSubmitButton handleClose={this.handleClose}/>
                    </DialogActions>
                </Dialog>
                
                <Button variant='contained' style={{width: '100%'}} color='secondary' onClick={this.handleOpen}>
                    Make transaction
                </Button>
            </>
        );
    }
    
}

export default withStyles(styles)(TransactionFormDialog);
