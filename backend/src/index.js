
const WebSocket = require('ws');

const {miningEndpoint} = require('./mining/miningEndpoint');
const {createTransaction} = require('./transactions/createTransaction');
const {getTransactionsSortedByFee} = require('./transactions/transactions');
const {sendDatabaseState} = require('./sendDatabaseState');
const {loadBlockchainMetadata} = require('./blockchain');
const {websockets} = require('./websockets');
const {initializeMongoClient} = require('./data/db');

const init = async () => {

    await initializeMongoClient();

    await loadBlockchainMetadata();
    
    const wss = new WebSocket.Server({ port: 9000 });
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
};

init();


