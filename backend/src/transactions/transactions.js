
import {generateKeys, signData, verifySignature} from './signing';
import {transactionPool} from './transactionsPool';

const keys = generateKeys();

const signTransaction = (transactionPayload) => {

    const signature = signData(JSON.stringify(transactionPayload), keys.private);

    const signedTransaction = {
        transactionPayload,
        signature
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


export {signTransaction, verifyTransaction};

