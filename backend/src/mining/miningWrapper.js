
const {addToBlockchain, blockchainMetadata} = require('../blockchain');
const {makeHash} = require('../hashing');
const {log1} = require('../utilities');

const {websockets} = require('../websockets');

const {removeTransactionsFromPool} = require('../transactions/selectTransactions');
const {addTransactionsToUTxO, removeOldUTxO} = require('../transactions/unspentTransactionOutputs');
const {selectTransactionsToMine} = require('../transactions/selectTransactions');


const {setMiningFinished} = require('./miningEndpoint');

const {fork} = require('child_process');


const generateCoinbase = () => {
    
    const coinbaseTransaction = {
        transaction: {
            inputs: [
                {txHash: 'coinbase', outputIndex: blockchainMetadata.blockchainHeight+1}
            ],
            outputs: [
                {address: 'rafa', amount: 25}
            ],
            fee: 0
        }
    };

    const coinbaseTransactionWithHash = [
        makeHash(JSON.stringify(coinbaseTransaction)), 
        coinbaseTransaction
    ];

    return coinbaseTransactionWithHash;
};


const constructStoreAndSendMinedBlock = (calculatedNonce, nextBlockHeaderTemplate, transactions) => {

    
    const minedBlockHeader = Object.assign({}, nextBlockHeaderTemplate, {nonce: calculatedNonce});

    const minedBlock = Object.assign({}, minedBlockHeader, {transactions: transactions});

    log1('New block constructed:', minedBlock);

    const minedBlockHeaderHash = makeHash(JSON.stringify(minedBlockHeader));
    

    addTransactionsToUTxO(transactions, minedBlockHeaderHash);

    try {
        addToBlockchain(minedBlock, minedBlockHeaderHash);

        websockets[0].send(JSON.stringify({
            type: 'newBlock', 
            data: [minedBlockHeaderHash, minedBlock]}
        ));
    } catch (error) {
        console.log('ERROR, validation failed:',error.reason);
    }
};

const startMining = async () => {

    log1('Creating separate mining process:', '');
    
    const miningProcess = fork(process.env.NODE_ENV ? 'src/mining/miningSubprocess.js' : 'dist/mining/miningSubprocess.js');


    miningProcess.on('message', async (msg) => {

        console.log('Message from mining subprocess received: ', msg);

        const calculatedNonce = msg.data;

        console.log('Calculated nonce: ', calculatedNonce);

        await removeTransactionsFromPool(selectedTransactions);

        await removeOldUTxO(selectedTransactions);
        
        constructStoreAndSendMinedBlock(calculatedNonce, nextBlockHeaderTemplate, transactions);

        setMiningFinished();
    });

    miningProcess.on('exit', function (code, signal) {
        console.log('Mining process exited with ' +
                    `code ${code} and signal ${signal}`);
    });



    log1('Current tip:', blockchainMetadata.blockchainTipHash);
    
    const coinbase = generateCoinbase();
    
    const selectedTransactions = await selectTransactionsToMine();

    const transactions = [coinbase].concat(selectedTransactions);

    log1('Coinbase | selected transactions:', transactions);

    const nextBlockHeaderTemplate = {
        previousHash: blockchainMetadata.blockchainTipHash,
        merkleRoot: makeHash(JSON.stringify(transactions)),
        target: blockchainMetadata.target,
        nonce: 0
    };


    log1('Block header template constructed and sending to mining process:', nextBlockHeaderTemplate);

    miningProcess.send(nextBlockHeaderTemplate);
};


module.exports = {startMining};




