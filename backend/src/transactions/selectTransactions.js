
const {log1} = require('../utilities');
const {websockets} = require('../websockets');

const {getTransactionsFromDB, removeTransactionFromDB} = require('../data/transactionsDAO');


const compareTransactionsByFee = (a, b) => {
    console.log('fee1:', a.signedTransaction.transactionPayload.fee, 'fee2:', b.signedTransaction.transactionPayload.fee);
    return a.signedTransaction.transactionPayload.fee - b.signedTransaction.transactionPayload.fee;
};

const getTransactionsSortedByFee = async() => {

    const transactionsPool = await getTransactionsFromDB();

    console.log('transactionPool:', transactionsPool);

    return transactionsPool.sort(compareTransactionsByFee);
};

const selectTransactionsToMine = async () => {

    const allSortedTransactions = await getTransactionsSortedByFee();

    const selectedTransactions = [];

    while (allSortedTransactions.length > 0 && selectedTransactions.length < 2) {

        selectedTransactions.push(allSortedTransactions.pop());
    }


    log1('Selected transactions length:', selectedTransactions.length);
    log1('Selected transactions:', selectedTransactions);
    
    return selectedTransactions;
};

const removeTransactionsFromPool = async (minedTransactions) => {

    console.log('minedTransactions:', minedTransactions);

    // TODO make await
    minedTransactions.forEach(transaction => {

        removeTransactionFromDB(transaction.txID);
        websockets[0].send(JSON.stringify({type: 'deleteTransaction', data: transaction[0]}));
    });

};


module.exports = {selectTransactionsToMine, removeTransactionsFromPool};
