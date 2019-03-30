import React from 'react';

import {sendMessage, closeWebsocket} from '../webSocket';

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
        <Grid container style={{width: '95%', margin: 'auto'}}>

            <Grid item xs={9} style={{marginBottom: '20px', marginTop: '10px'}}>
                <AccountInfo />
            </Grid>

            <Grid item xs={3} style={{marginBottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Grid item xs={12}>
                    <MiningButton />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'fetch_database_state'});}}>
                        Fetch database state
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'sync_unconfirmed_transactions'});}}>
                        Fetch Tx pool
                    </Button>
                </Grid>
                {/* <Grid item xs={12}>
                    <Button variant='contained' style={{width: '100%'}} color='primary' onClick={()=>{sendMessage({type: 'fetch_UTxO'});}}>
                        Fetch UTxO
                    </Button>
                </Grid> */}
                <Grid item xs={12}>
                    <TransactionFormDialog />
                </Grid>
            </Grid>
                
            <Grid container spacing={32}>
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
