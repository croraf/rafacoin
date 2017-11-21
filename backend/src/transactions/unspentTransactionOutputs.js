
const unspentTx = new Map();

const addTransactionsToUTxO = (transactions, blockHash) => {

    transactions.forEach(transaction => {
        const UTxData = {
            blockHash: blockHash,
            transactionData: transaction[1].transaction, 
            unspentOutputs: []
        };

        transaction[1].transaction.outputs.forEach((output, index) => {
            UTxData.unspentOutputs.push(index);
        });

        unspentTx.set(transaction[0], UTxData);
    });

    console.log('entries:', [...unspentTx.entries()]);
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

