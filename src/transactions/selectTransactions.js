
import {transactionPool} from './transactionsPool';
import {makeHash} from '../hashing';
import {log1} from '../utilities';

const selectTransactions = () => {
    const selectedTransactions = Object.values(transactionPool).filter((signedTransaction) => signedTransaction.transaction.fee >= 1);

    log1('Selected transactions:', selectedTransactions.map(transaction => transaction.transaction));
    
    return selectedTransactions;
};

const removeTransactionsFromPool = (transactions) => {
    transactions.forEach(transaction => {

        delete transactionPool[makeHash(JSON.stringify(transaction))];
    });

};

export {selectTransactions, removeTransactionsFromPool};
