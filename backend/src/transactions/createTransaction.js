
import {signTransaction, getTransactionsSortedByFee} from './transactions';
import {transactionPool} from './transactionsPool';

import {log1} from '../utilities';
import {makeHash} from '../hashing';

import {websockets} from '../websockets';

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

    const signedTransaction = signTransaction(transactionData);
    const signedTransactionHash = makeHash(JSON.stringify(signedTransaction));

    if (!transactionPool.has(signedTransactionHash)) {
        transactionPool.set(signedTransactionHash, signedTransaction);
        
        const transaction = [signedTransactionHash, signedTransaction];

        websockets[0].send(JSON.stringify({type: 'newTransaction', data: transaction}));
    }
    

    

};

export {createTransaction};


