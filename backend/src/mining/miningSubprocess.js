const {makeHash} = require('../hashing');


const verifyMinedTarget = (hash, targetHash) => {
    if (hash <= targetHash) {
        return true;
    } else {
        return false;
    }
};


const findNonce = (blockHeaderTemplate) => {

    let miningTries = 0;
    let mined = false;
    let nonce = 0;
    let blockHeaderHash;

    while (!mined) {

        nonce++;
        miningTries++;

        blockHeaderTemplate.nonce = nonce;
        blockHeaderHash = makeHash(JSON.stringify(blockHeaderTemplate));
        mined = verifyMinedTarget(blockHeaderHash, blockHeaderTemplate.target);

    }

    if (mined) {

        console.log('Found correct header hash:', blockHeaderHash);
        
        return nonce;

    } else {
        throw {error: 'mining error'};
    }
};


process.on('message', (blockHeaderTemplate) => {

    console.log('In mining subprocess!!!');
  
    console.log('Recieved header template: ', blockHeaderTemplate);

    const foundNonce = findNonce(blockHeaderTemplate);

    process.send({type: 'calculatedNonce', data: foundNonce});
});

