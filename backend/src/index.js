
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

import {startMining} from './mining/mining';
import {websockets} from './websockets';
import {blockchain, blockchainTipHash} from './blockchain';
import {createTransaction} from './transactions/createTransactions';
import {getTransactionsSortedByFee} from './transactions/transactions';

wss.on('connection', (ws) => {

    websockets.push(ws);

    ws.on('message', message => {
        const parsedMessage = JSON.parse(message);

        console.log('received:', parsedMessage);
        
        switch (parsedMessage.type) {
            case 'create_transaction':
                console.log('making transaction');
                createTransaction(parsedMessage.data);
                ws.send(JSON.stringify({note: 'Transactions created!'}));
                break;
            case 'Start mining!!!':

                console.log('starting mining');
                startMining(5);
                break;
            case 'Fetch blockchain':
                console.log('fetching blockchain');
                const blockchainArray = [];
                let blockchainTipHashTemp = blockchainTipHash;
                while (blockchainTipHashTemp) {
                    blockchainArray.push([blockchainTipHashTemp, blockchain[blockchainTipHashTemp]]);
                    blockchainTipHashTemp = blockchain[blockchainTipHashTemp].previousHash;
                }
                ws.send(JSON.stringify({type: 'blockchain', data: blockchainArray}));
                break;
            case 'Fetch unconfirmed transactions':
                console.log('fetching unconfirmed transactions');
                ws.send(JSON.stringify({type: 'unconfirmed transactions', data: getTransactionsSortedByFee()}));
                break;
        }

    });

    ws.on('close', () => {
        websockets.pop();
    });

    
});
