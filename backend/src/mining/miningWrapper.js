
import {blockchain, blockchainTipHash, addToBlockchain, blockchainHeight} from '../blockchain';
import {makeHash} from '../hashing';
import {log1} from '../utilities';

import {websockets} from '../websockets';

import {removeTransactionsFromPool} from '../transactions/selectTransactions';
import {addTransactionsToUTxO, removeOldUTxO} from '../transactions/unspentTransactionOutputs';
import {selectTransactionsToMine} from '../transactions/selectTransactions';


import {setMiningFinished} from './miningEndpoint';

import {fork} from 'child_process';

const generateCoinbase = () => {
    
    const coinbaseTransaction = {
        transaction: {
            inputs: [
                {txHash: 'coinbase', outputIndex: blockchainHeight+1}
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


const constructAndSendMinedBlock = (calculatedNonce, nextBlockHeaderTemplate, transactions) => {

    
    const minedBlockHeader = Object.assign({}, nextBlockHeaderTemplate, {nonce: calculatedNonce});

    const minedBlock = Object.assign({}, minedBlockHeader, {transactions: transactions});

    log1('Entire mined block:', minedBlock);

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
}

const constructAndMineBlock = () => {

    console.log('tip:', blockchainTipHash);

    const coinbase = generateCoinbase();
    
    const selectedTransactions = selectTransactionsToMine();

    const transactions = [coinbase].concat(selectedTransactions);

    log1('Transactions:', transactions);


    const nextBlockHeaderTemplate = {
        previousHash: blockchainTipHash,
        merkleRoot: makeHash(JSON.stringify(transactions)),
        target: blockchain[blockchainTipHash].target,
        nonce: 0
    };

    log1('Creating separate mining process:', '');

    
    const child = fork(process.env.NODE_ENV ? 'src/mining/miningSubprocess.js' : 'dist/mining/miningSubprocess.js');


    child.on('message', (msg) => {


        console.log('Message from child: ', msg);

        const calculatedNonce = msg.data;

        console.log('Calculated nonce: ', calculatedNonce);


        removeTransactionsFromPool(selectedTransactions);
        removeOldUTxO(selectedTransactions);
        

        constructAndSendMinedBlock(calculatedNonce, nextBlockHeaderTemplate, transactions);

        setMiningFinished();
    });
      
    child.send(nextBlockHeaderTemplate);

    child.on('exit', function (code, signal) {
        console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
    });
};


export {constructAndMineBlock};




