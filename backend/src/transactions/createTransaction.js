
import {signTransaction, getTransactionsSortedByFee} from './transactions';
import {transactionPool} from './transactionsPool';

import {log1} from '../utilities';
import {makeHash} from '../hashing';

import {websockets} from '../websockets';

const createTransaction = (data) => {

    console.log('transaction data:', data);
    let transactionData = {
        inputs: data.inputs.map(input => {
            return {txHash: input.txHash, outputIndex: input.outputIndex}
        }),
        outputs: data.outputs.map(output => {
            return {address: output.address, amount: output.amount}
        }),
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


