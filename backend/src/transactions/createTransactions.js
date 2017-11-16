
import {signTransaction, getTransactionsSortedByFee} from './transactions';
import {transactionPool} from './transactionsPool';

import {log1} from '../utilities';
import {makeHash} from '../hashing';

import {websockets} from '../websockets';

const signAndAddTransaction = (transactionData) => {

    const signedTransaction = signTransaction(transactionData);

    transactionPool.set(makeHash(JSON.stringify(signedTransaction)), signedTransaction);

    return [makeHash(JSON.stringify(signedTransaction)), signedTransaction];
};

const createTransaction = (data) => {

    console.log(data);
    let transactionData = {
        inputs: [
            {address: data.referenceHash, outputIndex: data.referenceOutputIndex}
        ],
        outputs: [
            {address: data.output1Address, amount: data.output1Amount},
            {address: data.output2Address, amount: data.outpu2Amount},
        ],
        fee: data.fee
    };

    let transaction = signAndAddTransaction(transactionData);
    websockets[0].send(JSON.stringify({type: 'newTransaction', data: transaction}));

    
    transactionData = {
        inputs: [
            {address: 'ivan', outputIndex: 1}
        ],
        outputs: [
            {address: 'petar', amount: 99},
            {address: 'ivan', amount: 10},
        ],
        fee: 1
    };
    
    transaction = signAndAddTransaction(transactionData);
    websockets[0].send(JSON.stringify({type: 'newTransaction', data: transaction}));

    transactionData = {
        inputs: [
            {address: 'ivan', outputIndex: 0}
        ],
        outputs: [
            {address: 'marko', amount: 9.5},
            {address: 'ivan', amount: 10},
        ],
        fee: 0.5
    };
    
    transaction = signAndAddTransaction(transactionData);
    websockets[0].send(JSON.stringify({type: 'newTransaction', data: transaction}));


    transactionData = {
        inputs: [
            {address: 'ivan', outputIndex: 1}
        ],
        outputs: [
            {address: 'marko', amount: 8.5},
            {address: 'ivan', amount: 10},
        ],
        fee: 1.5
    };
    
    transaction = signAndAddTransaction(transactionData);
    websockets[0].send(JSON.stringify({type: 'newTransaction', data: transaction}));
    
    const sortedTransactions = getTransactionsSortedByFee();
    
        
    log1('Transactions by fee:', '\n');
    for (let item of sortedTransactions) {
        log1('Transaction:', item);
    }
};

export {createTransaction};


