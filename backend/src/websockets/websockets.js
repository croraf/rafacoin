const WebSocket = require('ws');

const {miningEndpoint} = require('../mining/miningEndpoint');
const {createTransaction} = require('../transactions/createTransaction');
const {getTransactionsSortedByFee} = require('../transactions/transactions');
const {sendDatabaseState} = require('../sendDatabaseState');

const {websockets} = require('./outbound');


const wsOnConnectionHandler = (ws) => {
        
    console.log('[WS] websocket client connected');

    websockets.push(ws);

    sendDatabaseState(ws);

    ws.on('message', async message => {
        const parsedMessage = JSON.parse(message);

        console.log('[WS] received:', parsedMessage);
        
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
        console.log('[WS] websocket client disconnected');
    });
};


const initializeWebsocketServer = () => {
    const wss = new WebSocket.Server({ port: 9000 });

    wss.on('connection', wsOnConnectionHandler);
};


module.exports = {initializeWebsocketServer};

