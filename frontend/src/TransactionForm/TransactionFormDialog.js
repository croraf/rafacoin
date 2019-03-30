import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@material-ui/core/Dialog';

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
            <Grid style={{marginBottom: '10px'}}>

                <Dialog
                        open={this.state.open}
                        onRequestClose={this.handleClose}
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
                
                <Grid xs={3}>
                    <Button variant='contained' style={{width: '100%'}} color='secondary' onClick={this.handleOpen}>
                        Make transaction
                    </Button>
                </Grid>
            </Grid>
        );
    }
    
}

export default withStyles(styles)(TransactionFormDialog);
