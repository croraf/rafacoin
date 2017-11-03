import {signTransaction} from './transactions/transactions';
import {transactionPool} from './transactions/transactionsPool';
import {makeHash} from './hashing';

const transactionData = {
    inputs: [
        {address: 'ivan', value: 110}
    ],
    outputs: [
        {address: 'ivan', value: 99},
        {address: 'marko', value: 10},
    ],
    fee: 1
};

const signedTransaction = signTransaction(transactionData);
transactionPool[makeHash(JSON.stringify(signedTransaction))] = signedTransaction;



import {blockchain, blockchainTipHash, addToBlockchain} from './blockchain';
import {mineBlock} from './mining';

console.log('blockchain:', blockchain);

for (let i = 0; i < 10; i++){

    console.log('tip:', blockchainTipHash);
    const minedBlock = mineBlock();

    try {
        addToBlockchain(minedBlock);
    } catch (error) {
        console.log(error.reason);
    }
    
}


log1('blockchain:', blockchain);

