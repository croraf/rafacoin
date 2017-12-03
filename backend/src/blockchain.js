
import {getMetadata, updateBlockchainMetadata} from './data/metaDAO';
import {getBlockFromDB, insertBlockInDB} from './data/blockchainDAO';

import {makeHash} from './hashing';
import {log1} from './utilities';


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


const addToBlockchain = (block, hash) => {

    if (validateBlock(block, hash)) {

        insertBlockInDB(hash, block);

        updateBlockchainMetadata(hash, blockchainMetadata.blockchainHeight+1);
        
        blockchain[hash] = block;
        blockchainMetadata.blockchainTipHash = hash;
        blockchainMetadata.blockchainHeight++;
        log1('block added:' + hash, block);
        return;
    } else {
        throw {reason: 'Validation failed! Block not added to blockchain!'};
    }
};


const getBlockchainArray = async () => {
    
    const blockchainArray = [];
    const blockchainMetadataLoaded = await getMetadata();
    console.log('metadata:', blockchainMetadataLoaded);

    blockchainMetadata.blockchainHeight = blockchainMetadataLoaded.blockchainHeight;
    blockchainMetadata.blockchainTipHash = blockchainMetadataLoaded.blockchainTipHash;
    blockchainMetadata.target = blockchainMetadataLoaded.target;

    let blockchainTipHashTemp = blockchainMetadataLoaded.blockchainTipHash;
    while (blockchainTipHashTemp) {

        const currentBlock = await getBlockFromDB(blockchainTipHashTemp);
        blockchainArray.push([blockchainTipHashTemp, currentBlock.block]);
        blockchainTipHashTemp = currentBlock.block.previousHash;
    }

    //console.log('blockchainArray:', blockchainArray);
    return blockchainArray;
}


export {addToBlockchain, blockchainMetadata, getBlockchainArray};
