
const unspentTx = new Map();


import {addUTxO, deleteUTxO} from '../data/utxoDAO';



const addTransactionsToUTxO = (transactions, blockHash) => {

    transactions.forEach(transaction => {

        console.log('transaction:', transaction);

        transaction[1].transaction.outputs.forEach((output, index) => {

            addUTxO({txID: transaction[0], index, output, blockHash});
        });
    });
};

const removeOldUTxO = (minedTransactions) => {

    minedTransactions.forEach(transaction => {

        transaction[1].transaction.inputs.forEach(input => {
            console.log('mined transaction input:', input);   
            const unspentTransaction = unspentTx.get(input.txHash);
            unspentTransaction.unspentOutputs = unspentTransaction.unspentOutputs.filter(
                output => output !== input.outputIndex
            );

            if (unspentTransaction.unspentOutputs.length === 0) {unspentTx.delete(input.txHash);}
            else {unspentTx.set(input.txHash, unspentTransaction);}
        });   
    });
};

export {unspentTx, addTransactionsToUTxO, removeOldUTxO};

