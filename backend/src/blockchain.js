
const {getMetadata, updateBlockchainMetadata} = require('./data/metaDAO');
const {getBlockFromDB, insertBlockInDB} = require('./data/blockchainDAO');

const {log1} = require('./utilities');


const blockchainMetadata = {
    blockchainHeight: undefined,
    blockchainTipHash: undefined,
    target: undefined
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
        
        blockchainMetadata.blockchainTipHash = hash;
        blockchainMetadata.blockchainHeight++;
        log1('block added:' + hash + '\n', block);
        return;
    } else {
        throw {reason: 'Validation failed! Block not added to blockchain!'};
    }
};


const getBlockchainArray = async () => {
    
    const blockchainArray = [];
    
    let blockchainTipHashTemp = blockchainMetadata.blockchainTipHash;

    while (blockchainTipHashTemp) {

        const currentBlock = await getBlockFromDB(blockchainTipHashTemp);
        blockchainArray.push([blockchainTipHashTemp, currentBlock.block]);
        blockchainTipHashTemp = currentBlock.block.previousHash;
    }

    //console.log('blockchainArray:', blockchainArray);
    return blockchainArray;
};


const loadBlockchainMetadata = async () => {

    console.log('LOADING BLOCKCHAIN METADATA...');

    const blockchainMetadataLoaded = await getMetadata();

    blockchainMetadata.blockchainHeight = blockchainMetadataLoaded.blockchainHeight;
    blockchainMetadata.blockchainTipHash = blockchainMetadataLoaded.blockchainTipHash;
    blockchainMetadata.target = blockchainMetadataLoaded.target;

    console.log('Metadata loaded from: ', blockchainMetadata);
};

module.exports = {addToBlockchain, blockchainMetadata, getBlockchainArray, loadBlockchainMetadata};
