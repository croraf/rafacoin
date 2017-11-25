const blockchain = {
    'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3': {
        previousHash: undefined,
        transactions: [],
        target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
        noonce: 0
    }
};

let blockchainTipHash = 'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3';

let blockchainHeight = 0;

const validateBlock = (block, hash) => {
    if (block.previousHash !== blockchainTipHash) {
        throw({reason: 'Doesn\'t reference the blockchainTipHash'});
    } else {
        log1('Comparing hash and target:', hash + '\n ' + block.target);

        if (hash <= block.target) {
            return true;
        } else {
            throw({reason: 'Hash is not below target!'});
        }
    }
};

import {makeHash} from './hashing';
import {log1} from './utilities';

const addToBlockchain = (block, hash) => {

    if (validateBlock(block, hash)) {
        blockchain[hash] = block;
        blockchainTipHash = hash;
        blockchainHeight++;
        log1('block added:' + hash, block);
        return;
    } else {
        throw {reason: 'Validation failed! Block not added to blockchain!'};
    }
};

export {addToBlockchain, blockchain, blockchainTipHash, blockchainHeight};
