
const {loadBlockchainMetadata} = require('./blockchain');
const {initializeMongoClient} = require('./data/db');
const {initializeWebsocketServer} = require('./websockets');

const init = async () => {

    await initializeMongoClient();

    await loadBlockchainMetadata();
    
    initializeWebsocketServer();

    console.log('BACKEND STARTED');
};

init();


