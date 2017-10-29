import {signTransaction} from './transactions/transactions';
import {transactionPool} from './transactions/transactionsPool';


const transaction = {
    inputs: [
        {address: 'ivan', value: 110}
    ],
    outputs: [
        {address: 'ivan', value: 99},
        {address: 'marko', value: 10},
    ],
    fee: 1
};

const signedTransaction = signTransaction(transaction);
transactionPool.push(signedTransaction);



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


console.log('blockchain:', blockchain);

