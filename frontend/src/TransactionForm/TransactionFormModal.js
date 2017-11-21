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
                        title='Make transaction'
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        actions={<RemoteSubmitButton handleClose={this.handleClose}/>}
                        contentStyle={{width: '95%', maxWidth: '1400px'}}
                        bodyStyle={{maxHeight: '250px', overflowY: 'auto'}}
                        style={{marginTop: '-100px'}}>
                        
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
