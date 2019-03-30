const {getConnection} = require('./db');

const getMetadata = async (hash) => {
    
    return await getConnection().collection("meta").findOne({type: 'blockchainMeta'});
}

const updateBlockchainMetadata = async (blockchainTipHash, blockchainHeight) => {
    
    return await getConnection().collection("meta").update(
        {type: 'blockchainMeta'},
        {
            type: 'blockchainMeta',
            blockchainTipHash: blockchainTipHash,
            blockchainHeight: blockchainHeight,
            target: '0000100ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3'
        }
    );
}

module.exports = {getMetadata, updateBlockchainMetadata};
