const {getConnection} = require('./db');


const addTransactionToDB = async (txID, signedTransaction) => {

    const insertData = { txID: txID, signedTransaction: signedTransaction };

    await getConnection().collection('transactions').insertOne(insertData);
    console.log('Transaction added to transactions database.');
};

const getTransactionsFromDB = async () => {

    return await getConnection().collection('transactions').find({}).toArray();
};

const removeTransactionFromDB = async (txID) => {

    return await getConnection().collection('transactions').deleteOne({txID: txID}).result;
};

const clearTransactions = async () => {
    return await getConnection().collection('transactions').drop();
};

module.exports = {addTransactionToDB, getTransactionsFromDB, removeTransactionFromDB, clearTransactions};

