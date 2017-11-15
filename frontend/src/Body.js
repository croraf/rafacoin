import React from 'react';

import {sendMessage, closeWebsocket} from './webSocket';

import {BlockchainContainer} from './BlockchainContainer';
import {TransactionsContainer} from './TransactionsContainer';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/RaisedButton';

import {TransactionFormModal} from './TransactionFormModal';

const Body = () => {

    return (
        <Grid>

            <Row style={{marginBottom: '10px'}}>
                <Col xs={3}>
                    <Button fullWidth={true} primary={true} onClick={()=>{sendMessage({type: 'Start mining!!!'});}}>Start mining</Button>
                </Col>
                <Col xs={3}>
                    <Button fullWidth={true} primary={true} onClick={()=>{sendMessage({type: 'Fetch blockchain'});}}>Fetch blockchain</Button>
                </Col>
                <Col xs={3}>
                    <Button style={{wordWrap: 'none'}} fullWidth={true} primary={true} onClick={()=>{sendMessage({type: 'Fetch unconfirmed transactions'});}}>Fetch unconfirmed transactions</Button>
                </Col>
            </Row>
                
            <TransactionFormModal />

            <Row>
                <Col xs={6}>
                    <TransactionsContainer />
                </Col>
                <Col xs={6}>
                    <BlockchainContainer />
                </Col>
            </Row>
        </Grid>
    );
};

export {Body};
