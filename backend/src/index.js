
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

import {startMining} from './bitcoin-core';
import {websockets} from './websockets';


wss.on('connection', (ws) => {

    websockets.push(ws);

    ws.on('message', message => {
        console.log('received: %s', message);
        
        if (message === 'Start mining!!!') {
            console.log('starting mining');
            startMining();
            ws.send(JSON.stringify({note: 'Mining finished!!!'}));
        }
    });

    
});
