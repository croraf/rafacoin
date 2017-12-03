
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

import {miningEndpoint} from './mining/miningEndpoint';
import {websockets} from './websockets';
import {blockchain, blockchainTipHash} from './blockchain';
import {createTransaction} from './transactions/createTransaction';
import {getTransactionsSortedByFee} from './transactions/transactions';
import {unspentTx} from './transactions/unspentTransactionOutputs';

import {getBlockFromDB} from './data/blockchainDAO';
import {getMetadata} from './data/metaDAO';

import {sendDatabaseState} from './sendDatabaseState';

console.log('BACKEND STARTED');

import {getUTxO} from './data/utxoDAO';

wss.on('connection', (ws) => {

    websockets.push(ws);

    sendDatabaseState(ws);

    ws.on('message', async message => {
        const parsedMessage = JSON.parse(message);

        console.log('received:', parsedMessage);
        
        switch (parsedMessage.type) {

            case 'create_transaction':
                console.log('making transaction');
                createTransaction(parsedMessage.data);
                break;

            case 'start_mining':
                miningEndpoint();
                break;

            case 'fetch_database_state':
                
                sendDatabaseState(ws);
                break;

            case 'sync_unconfirmed_transactions':
                console.log('fetching unconfirmed transactions');
                ws.send(JSON.stringify({type: 'unconfirmed transactions', data: getTransactionsSortedByFee()}));
                break;
        }

    });

    ws.on('close', () => {
        websockets.pop();
    });

    
});
