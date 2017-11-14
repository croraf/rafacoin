
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

import {startMining} from './mining/mining';
import {websockets} from './websockets';
import {blockchain, blockchainTipHash} from './blockchain';
import {createTransactions} from './transactions/createTransactions';
import {getTransactionsSortedByFee} from './transactions/transactions';

wss.on('connection', (ws) => {

    websockets.push(ws);

    ws.on('message', message => {
        console.log('received: %s', message);
        
        switch (message) {
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
            case 'Make transaction':
                console.log('making transaction');
                createTransactions();
                ws.send(JSON.stringify({note: 'Transactions created!'}));
                break;
            case 'Fetch transactions':
                console.log('fetching transactions');
                ws.send(JSON.stringify({type: 'transactions', data: getTransactionsSortedByFee()}));
                break;
        }

    });

    ws.on('close', () => {
        websockets.pop();
    });

    
});
