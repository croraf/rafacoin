
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

import {startMining} from './mining/mining';
import {websockets} from './websockets';
import {blockchain, blockchainTipHash} from './blockchain';

wss.on('connection', (ws) => {

    websockets.push(ws);

    ws.on('message', message => {
        console.log('received: %s', message);
        
        switch (message) {
            case 'Start mining!!!':

                console.log('starting mining');
                startMining();
                ws.send(JSON.stringify({note: 'Mining finished!!!'}));
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
        }

    });

    ws.on('close', () => {
        websockets.pop();
    });

    
});
