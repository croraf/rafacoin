const blockchain = {
    'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3': {
        previousHash: undefined,
        transactions: [],
        target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
        noonce: 0
    }
};

import {insertBlockInDB} from './data/blockchainDAO';

const blockchainMetadata = {
    blockchainHeight: undefined,
    blockchainTipHash: undefined
};

const validateBlock = (block, hash) => {
    if (block.previousHash !== blockchainMetadata.blockchainTipHash) {
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
import { updateBlockchainMetadata } from './data/metaDAO';

const addToBlockchain = (block, hash) => {

    if (validateBlock(block, hash)) {

        insertBlockInDB(hash, block);

        updateBlockchainMetadata(hash);
        
        blockchain[hash] = block;
        blockchainMetadata.blockchainTipHash = hash;
        blockchainMetadata.blockchainHeight++;
        log1('block added:' + hash, block);
        return;
    } else {
        throw {reason: 'Validation failed! Block not added to blockchain!'};
    }
};

export {addToBlockchain, blockchain, blockchainMetadata};
