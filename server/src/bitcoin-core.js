import {generateKeys, signData, verifySignature} from './signing';

const keys = generateKeys();

const transaction = {
    inputs: [
        {address: 'rafa', value: 110}
    ],
    outputs: [
        {address: 'rafa', value: 99},
        {address: 'marko', value: 10},
    ],
    fee: 1
};

const signature = signData(JSON.stringify(transaction), keys.private);

const signedTransaction = {
    transaction: transaction,
    signature: signature
};

console.log(signedTransaction);



const verified = verifySignature(
    JSON.stringify(signedTransaction.transaction),
    signedTransaction.signature,
    keys.public
);

console.log(verified);



/*cosnt diffHell = crypto.createECDH('secp521r1');
diffHell.generateKeys('base64');

console.log('keys:', diffHell.getPublicKey('base64'));

cosnt encr = crypto.publicEncrypt(diffHell.getPublicKey('base64'), new Buffer("Moja prva poruka"));
console.log(encr);

cosnt decr = crypto.privateDecrypt(diffHell.getPrivateKey('base64'), encr);

console.log(decr.toString());*/

