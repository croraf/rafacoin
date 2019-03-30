import React from 'react';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@material-ui/core/Dialog';

import {TransactionForm} from './TranasactionForm';


import Button from '@material-ui/core/Button';
import { Grid, Row, Col } from 'react-flexbox-grid';

import RemoteSubmitButton from './RemoteSubmitButton';

import { withStyles } from '@material-ui/core/styles';

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
            <Row style={{marginBottom: '10px'}}>

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
                
                <Col xs={3}>
                    <Button raised={true} style={{width: '100%'}} color='accent' onClick={this.handleOpen}>
                        Make transaction
                    </Button>
                </Col>
            </Row>
        );
    }
    
}

export default withStyles(styles)(TransactionFormDialog);
