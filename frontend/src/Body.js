import React from 'react';

import {sendMessage, closeWebsocket} from './webSocket';

import {BlockchainContainer} from './Blockchain/BlockchainContainer';
import {TransactionsContainer} from './TransactionsPool/TransactionsContainer';
import TransactionFormDialog from './TransactionForm/TransactionFormDialog';
import {UTxOContainer} from './UTxO/UTxOContainer';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'material-ui/Button';

import {MiningButton} from './MiningButton';

import {AccountInfo} from './AccountInfo/AccountInfo';

const Body = () => {

    return (
        <Grid style={{width: '95%'}}>

            <Row style={{marginBottom: '20px', marginTop: '10px'}}>
                <AccountInfo />
            </Row>

            <Row style={{marginBottom: '10px'}}>
                <Col xs={3}>
                    <MiningButton />
                </Col>
                <Col xs={3}>
                    <Button raised={true} style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'fetch_database_state'});}}>
                        Fetch database state
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button raised={true} style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'sync_unconfirmed_transactions'});}}>
                        Fetch Tx pool
                    </Button>
                </Col>
                {/* <Col xs={3}>
                    <Button raised={true} style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'fetch_UTxO'});}}>
                        Fetch UTxO
                    </Button>
                </Col> */}
            </Row>
                
            <TransactionFormDialog />

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
