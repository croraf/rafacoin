import {generateKeys, signData, verifySignature} from './signing';
import {transactionPool} from './transactionsPool';

const keys = generateKeys();

const signTransaction = (transaction) => {

    const signature = signData(JSON.stringify(transaction), keys.private);

    const signedTransaction = {
        transaction: transaction,
        signature: signature
    };

    return signedTransaction;
};


const verifyTransaction = (signedTransaction) => {

    const verified = verifySignature(
        JSON.stringify(signedTransaction.transaction),
        signedTransaction.signature,
        keys.public
    );
    
    console.log(verified);

    return verified;
};

const sortTransactionsByFee = (a, b) => {
    return a[1].transaction.fee - b[1].transaction.fee;
};

const getTransactionsSortedByFee = () => {

    return [...transactionPool.entries()].sort(sortTransactionsByFee);
};

export {signTransaction, verifyTransaction, getTransactionsSortedByFee};

