
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

console.log('BACKEND STARTED');

wss.on('connection', (ws) => {

    websockets.push(ws);

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

            case 'sync_blockchain':
                console.log('fetching blockchain');
                const blockchainArray = [];
                const blockchainMetadata = await getMetadata();
                console.log('metadata:', metadata);

                let blockchainTipHashTemp = blockchainMetadata.blockchainTipHash;
                while (blockchainTipHashTemp) {

                    const currentBlock = await getBlockFromDB(blockchainTipHashTemp);
                    blockchainArray.push([blockchainTipHashTemp, currentBlock.block]);
                    blockchainTipHashTemp = currentBlock.block.previousHash;
                }
                ws.send(JSON.stringify({type: 'blockchain', data: blockchainArray}));
                break;

            case 'sync_unconfirmed_transactions':
                console.log('fetching unconfirmed transactions');
                ws.send(JSON.stringify({type: 'unconfirmed transactions', data: getTransactionsSortedByFee()}));
                break;
            case 'UTxO':
                console.log([...unspentTx.entries()]);
                ws.send(JSON.stringify({type: 'UTxO', data: [...unspentTx.entries()]}));
                break;
        }

    });

    ws.on('close', () => {
        websockets.pop();
    });

    
});
