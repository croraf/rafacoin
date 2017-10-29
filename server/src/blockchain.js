const blockchain = {
    'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3': {
        previousHash: undefined,
        transactions: [],
        target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
        noonce: 0
    }
};

let blockchainTipHash = 'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3';


const validateBlock = (block, hash) => {
    if (block.previousHash !== blockchainTipHash) {
        console.log('Doesn\'t reference the blockchainTipHash');
        return false;
    } else {
        if (hash <= block.target) {
            return true;
        } else {
            console.log('nonce is not below target!');
            return false;
        }
    }
};

import {makeHash} from './hashing';

const addToBlockchain = (block) => {

    
    const hash = makeHash(JSON.stringify(block));

    if (validateBlock(block, hash)) {
        blockchain[hash] = block;
        blockchainTipHash = hash;
        console.log('block added:', hash, block);
        return;
    } else {
        throw {reason: 'Validation failed! Block not added to blockchain!'};
    }
};

export {addToBlockchain, blockchain, blockchainTipHash};
