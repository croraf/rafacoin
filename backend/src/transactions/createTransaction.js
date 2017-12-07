
import {signTransaction, getTransactionsSortedByFee} from './transactions';
import {transactionPool} from './transactionsPool';

import {log1} from '../utilities';
import {makeHash} from '../hashing';

import {websockets} from '../websockets';

import {substituteInputsFromIDs} from './unspentTransactionOutputs';


const createTransaction = async (transactionData) => {

    console.log('Transaction data:', transactionData);

    const substitutedInputs = await substituteInputsFromIDs(transactionData.inputs);
    transactionData.inputs = substitutedInputs;

    console.log('Substituted transaction data: \n', transactionData);

    const signedTransaction = signTransaction(transactionData);
    const signedTransactionHash = makeHash(JSON.stringify(signedTransaction));

    if (!transactionPool.has(signedTransactionHash)) {
        transactionPool.set(signedTransactionHash, signedTransaction);
        
        const transaction = [signedTransactionHash, signedTransaction];

        websockets[0].send(JSON.stringify({type: 'newTransaction', data: transaction}));
    }
    

    

};

export {createTransaction};


