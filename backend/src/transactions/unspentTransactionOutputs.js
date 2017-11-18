
const unspentTxOutputs = new Map();

const addTransactionsToUTxO = (transactions, blockHash) => {

    transactions.forEach(transaction => {
        const UTxData = {
            blockHash: blockHash, 
            unspentOutputs: []
        };

        transaction[1].transaction.outputs.forEach((output, index) => {
            UTxData.unspentOutputs.push(index);
        });

        unspentTxOutputs.set(transaction[0], UTxData);
    });

    console.log('entries:', [...unspentTxOutputs.entries()]);
};

const removeOldUTxO = (minedTransactions) => {

    minedTransactions.forEach(transaction => {

        transaction[1].transaction.inputs.forEach(input => {
            console.log(input);   
            const unspentTransaction = unspentTxOutputs.get(input.address);
            unspentTransaction.unspentOutputs = unspentTransaction.unspentOutputs.filter(
                output => output !== input.outputIndex
            );

            if (unspentTransaction.unspentOutputs.length === 0) {unspentTxOutputs.delete(input.address);}
            else {unspentTxOutputs.set(input.address, unspentTransaction);}
        });   
    });
};

export {unspentTxOutputs, addTransactionsToUTxO, removeOldUTxO};

