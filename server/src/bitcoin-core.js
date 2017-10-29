/*import {generateKeys, signData, verifySignature} from './signing';

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


*/

import {blockchain, blockchainTipHash, addToBlockchain} from './blockchain';

import {mineBlock} from './mining';
import {makeHash} from './hashing';

console.log('blockchain:', blockchain);

for (let i = 0; i < 10; i++){
    console.log('tip:', blockchainTipHash);
    const minedBlock = mineBlock(blockchainTipHash);
    const minedBlockHash = makeHash(JSON.stringify(minedBlock));
    if (addToBlockchain(minedBlock, minedBlockHash)){
        console.log('block added:', minedBlockHash, minedBlock);
    } else {
        console.log('wrong block mined');
    }
}


console.log('blockchain:', blockchain);

