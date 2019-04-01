
const {loadBlockchainMetadata} = require('./blockchain');
const {initializeMongoDbClient} = require('./data/db');
const {initializeWebsocketServer} = require('./websockets/websockets');

const init = async () => {

    await initializeMongoDbClient();
    console.log('mongoDB client initialized');

    await loadBlockchainMetadata();
    console.log('blockchain metadata loaded');

    initializeWebsocketServer();
    console.log('websocket server initialized');

    console.log('BACKEND STARTED');
};

init();


