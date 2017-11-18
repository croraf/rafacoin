import React from 'react';

import {sendMessage, closeWebsocket} from './webSocket';

import {BlockchainContainer} from './Blockchain/BlockchainContainer';
import {TransactionsContainer} from './TransactionsPool/TransactionsContainer';
import {TransactionFormModal} from './TransactionForm/TransactionFormModal';
import {UTxOContainer} from './UTxO/UTxOContainer';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/RaisedButton';


const Body = () => {

    return (
        <Grid>

            <Row style={{marginBottom: '10px'}}>
                <Col xs={3}>
                    <Button fullWidth={true} primary={true} onClick={()=>{sendMessage({type: 'start_mining'});}}>Start mining</Button>
                </Col>
                <Col xs={3}>
                    <Button fullWidth={true} primary={true} onClick={()=>{sendMessage({type: 'sync_blockchain'});}}>Sync blockchain</Button>
                </Col>
                <Col xs={3}>
                    <Button style={{wordWrap: 'none'}} fullWidth={true} primary={true} onClick={()=>{sendMessage({type: 'sync_unconfirmed_transactions'});}}>Sync Tx pool</Button>
                </Col>
                <Col xs={3}>
                    <Button fullWidth={true} primary={true} onClick={()=>{sendMessage({type: 'UTxO'});}}>Sync UTxO</Button>
                </Col>
            </Row>
                
            <TransactionFormModal />

            <Row>
                <Col xs={6}>
                    <TransactionsContainer />
                    <UTxOContainer />
                </Col>
                <Col xs={6}>
                    <BlockchainContainer />
                </Col>
            </Row>
        </Grid>
    );
};

export {Body};
