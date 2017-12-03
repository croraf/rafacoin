import {miningEndpoint} from './mining/miningEndpoint';
import {websockets} from './websockets';
import {createTransaction} from './transactions/createTransaction';
import {getTransactionsSortedByFee} from './transactions/transactions';

import {sendDatabaseState} from './sendDatabaseState';

import {loadBlockchainMetadata} from './blockchain';

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

// TODO: make this synchronous
loadBlockchainMetadata();

wss.on('connection', (ws) => {

    websockets.push(ws);

    sendDatabaseState(ws);

    ws.on('message', async message => {
        const parsedMessage = JSON.parse(message);

        console.log('received:', parsedMessage);
        
        switch (parsedMessage.type) {

            case 'create_transaction':
                createTransaction(parsedMessage.data);
                break;

            case 'mine':
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


console.log('BACKEND STARTED');
