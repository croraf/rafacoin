
const {addUTxO, deleteUTxO, getUTxO} = require('../data/utxoDAO');


const unspentTx = new Map();

const substituteInputsFromIDs = async ( input_ids ) => {

    const substitutedInputs = [];

    console.log('input_ids:.....', input_ids);

    for (const i in input_ids) {

        const UTxO = await getUTxO(input_ids[i]);
        
        substitutedInputs.push({txID: UTxO.txID, index: UTxO.index});
    }

    console.log('...........', substitutedInputs);

    return substitutedInputs;
};


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

module.exports = {unspentTx, addTransactionsToUTxO, removeOldUTxO, substituteInputsFromIDs};

