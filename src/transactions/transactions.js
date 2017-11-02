import {generateKeys, signData, verifySignature} from './signing';

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


export {signTransaction, verifyTransaction};

