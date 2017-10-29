const blockchain = {
    'c00ee95ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3': {
        previousHash: undefined,
        transactions: [],
        target: '2000000ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
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

const addToBlockchain = (block, hash) => {

    if (validateBlock(block, hash)) {
        blockchain[hash] = block;
        blockchainTipHash = hash;
        return true;
    } else {
        return false;
    }
};

export {addToBlockchain, blockchain, blockchainTipHash};
