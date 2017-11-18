
import {signTransaction, getTransactionsSortedByFee} from './transactions';
import {transactionPool} from './transactionsPool';

import {log1} from '../utilities';
import {makeHash} from '../hashing';

import {websockets} from '../websockets';

const createTransaction = (data) => {

    console.log('transaction data:', data);
    let transactionData = {
        inputs: [
            {txHash: data.inputs[0].txHash, outputIndex: data.inputs[0].outputIndex}
        ],
        outputs: [
            {address: data.outputs[0].address, amount: data.outputs[0].amount},
            {address: data.outputs[0].address, amount: data.outputs[0].address},
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


