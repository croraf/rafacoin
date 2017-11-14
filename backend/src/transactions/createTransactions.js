
import {signTransaction, getTransactionsSortedByFee} from './transactions';
import {transactionPool} from './transactionsPool';

import {log1} from '../utilities';
import {makeHash} from '../hashing';

const signAndAddTransaction = (transactionData) => {

    const signedTransaction = signTransaction(transactionData);

    //transactionPool[makeHash(JSON.stringify(signedTransaction))] = signedTransaction;

    transactionPool.set(makeHash(JSON.stringify(signedTransaction)), signedTransaction);
};

const createTransactions = () => {

    let transactionData = {
        inputs: [
            {address: 'ivan', amount: 110}
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
            {address: 'ivan', amount: 20}
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
            {address: 'ivan', amount: 20}
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

export {createTransactions};


