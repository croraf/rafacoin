import React from 'react';

import {sendMessage, closeWebsocket} from './webSocket';

import {BlockchainContainer} from './Blockchain/BlockchainContainer';
import {TransactionsContainer} from './TransactionsPool/TransactionsContainer';
import TransactionFormDialog from './TransactionForm/TransactionFormDialog';
import {UTxOContainer} from './UTxO/UTxOContainer';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {MiningButton} from './MiningButton';

import {AccountInfo} from './AccountInfo/AccountInfo';

const Body = () => {

    return (
        <Grid container style={{width: '95%'}}>

            <Grid item style={{marginBottom: '20px', marginTop: '10px'}}>
                <AccountInfo />
            </Grid>

            <Grid item style={{marginBottom: '10px'}}>
                <Grid item xs={3}>
                    <MiningButton />
                </Grid>
                <Grid item xs={3}>
                    <Button variant='contained' style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'fetch_database_state'});}}>
                        Fetch database state
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant='contained' style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'sync_unconfirmed_transactions'});}}>
                        Fetch Tx pool
                    </Button>
                </Grid>
                {/* <Col xs={3}>
                    <Button variant='contained' style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'fetch_UTxO'});}}>
                        Fetch UTxO
                    </Button>
                </Col> */}
            </Grid>
                
            <TransactionFormDialog />

            <Grid>
                <Grid item xs={6}>
                    <TransactionsContainer />
                    <UTxOContainer />
                </Grid>
                <Grid item xs={6}>
                    <BlockchainContainer />
                </Grid>
            </Grid>
        </Grid>
    );
};

export {Body};
