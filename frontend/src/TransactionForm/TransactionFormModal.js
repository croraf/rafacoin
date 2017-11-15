import React from 'react';

import Dialog from 'material-ui/Dialog';

import {TransactionForm} from './TranasactionForm';


import Button from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';

import RemoteSubmitButton from './RemoteSubmitButton';

class TransactionFormModal extends React.Component {
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
                        title='Dialog Header'
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        actions={<RemoteSubmitButton handleClose={this.handleClose}/>} >
                        
                        <TransactionForm/>
                        
                </Dialog>
                <Col xs={6}>
                    <Button fullWidth={true} secondary={true} label="Make transaction" onClick={this.handleOpen} />
                </Col>
            </Row>
        );
    }
    
}

export {TransactionFormModal};
