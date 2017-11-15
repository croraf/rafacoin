
import {signTransaction, getTransactionsSortedByFee} from './transactions';
import {transactionPool} from './transactionsPool';

import {log1} from '../utilities';
import {makeHash} from '../hashing';

const signAndAddTransaction = (transactionData) => {

    const signedTransaction = signTransaction(transactionData);

    transactionPool.set(makeHash(JSON.stringify(signedTransaction)), signedTransaction);
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

    signAndAddTransaction(transactionData);
    
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
    
    signAndAddTransaction(transactionData);


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
    
    signAndAddTransaction(transactionData);


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
    
    signAndAddTransaction(transactionData);
    
    const sortedTransactions = getTransactionsSortedByFee();
    
        
    log1('Transactions by fee:', '\n');
    for (let item of sortedTransactions) {
        log1('Transaction:', item);
    }
};

export {createTransaction};


