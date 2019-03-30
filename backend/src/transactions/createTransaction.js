
const {signTransaction} = require('./transactions');
const {addTransactionToDB} = require('../data/transactionsDAO');
const {makeHash} = require('../hashing');
const {websockets} = require('../websockets');
const {substituteInputsFromIDs} = require('./unspentTransactionOutputs');


const createTransaction = async (transactionPayload) => {

    console.log('Transaction data:', transactionPayload);

    const substitutedInputs = await substituteInputsFromIDs(transactionPayload.inputs);
    transactionPayload.inputs = substitutedInputs;

    console.log('Substituted transaction data: \n', transactionPayload);

    const signedTransaction = signTransaction(transactionPayload);
    const txID = makeHash(JSON.stringify(signedTransaction));

    // what if there is confilicting transaction in the pool
    
    addTransactionToDB(txID, signedTransaction);
    
    const transaction = {
        txID,
        signedTransaction
    };

    websockets[0].send(JSON.stringify({type: 'newTransaction', data: transaction}));
    

    

};

module.exports = {createTransaction};


