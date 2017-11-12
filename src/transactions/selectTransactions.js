
import {transactionPool} from './transactionsPool';
import {getTransactionsSortedByFee} from './transactions';
import {makeHash} from '../hashing';
import {log1} from '../utilities';

const selectTransactionsToMine = () => {

    const allSortedTransactions = getTransactionsSortedByFee();

    const selectedTransactions = [];

    while (allSortedTransactions.length > 0 && selectedTransactions.length < 2) {

        selectedTransactions.push(allSortedTransactions.pop());
    }


    log1('Selected transactions length:', selectedTransactions.length);
    log1('Selected transactions:', selectedTransactions.map(transactionElement => transactionElement[1].transaction));
    
    return selectedTransactions;
};

const removeTransactionsFromPool = (minedTransactions) => {
    minedTransactions.forEach(transaction => {

        transactionPool.delete(transaction[0]);
    });

};

export {selectTransactionsToMine, removeTransactionsFromPool};
