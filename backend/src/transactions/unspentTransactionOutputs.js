
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

export {unspentTxOutputs, addTransactionsToUTxO};

