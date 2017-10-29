
import {transactionPool} from './transactionsPool';

const selectTransactions = () => {
    const selectedTransactions = transactionPool.filter((signedTransaction) => signedTransaction.transaction.fee >= 1);

    console.log('Selected transactions:', selectedTransactions.map(transaction => transaction.transaction));
    return selectedTransactions;
};

export {selectTransactions};
