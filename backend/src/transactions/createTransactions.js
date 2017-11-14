
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
            {address: 'ivan', value: 110}
        ],
        outputs: [
            {address: 'petar', value: 99},
            {address: 'ivan', value: 10},
        ],
        fee: 1
    };
    
    signAndAddTransaction(transactionData);


    transactionData = {
        inputs: [
            {address: 'ivan', value: 20}
        ],
        outputs: [
            {address: 'marko', value: 9},
            {address: 'ivan', value: 10},
        ],
        fee: 0.5
    };
    
    signAndAddTransaction(transactionData);


    transactionData = {
        inputs: [
            {address: 'ivan', value: 20}
        ],
        outputs: [
            {address: 'marko', value: 9.5},
            {address: 'ivan', value: 10},
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


