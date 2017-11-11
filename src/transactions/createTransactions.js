
import {signTransaction} from './transactions';
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
            {address: 'ivan', value: 99},
            {address: 'marko', value: 10},
        ],
        fee: 1
    };
    
    signAndAddTransaction(transactionData);


    transactionData = {
        inputs: [
            {address: 'ivan', value: 20}
        ],
        outputs: [
            {address: 'ivan', value: 9},
            {address: 'marko', value: 10},
        ],
        fee: 1
    };
    
    signAndAddTransaction(transactionData);


    transactionData = {
        inputs: [
            {address: 'ivan', value: 20}
        ],
        outputs: [
            {address: 'ivan', value: 9.5},
            {address: 'marko', value: 10},
        ],
        fee: 0.5
    };
    
    signAndAddTransaction(transactionData);
    
    const iterator = transactionPool.iterate();
    
    console.log('iterator:::');
    for (let item of transactionPool) {
        console.log(item);
    }
    /* while (true) {

        const item = iterator.next();

        if (item.done){
            break;
        }
        log1(item.value);
    } */
    
};

export {createTransactions};


