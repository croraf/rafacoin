
import {makeHash} from './hashing';

const verifyMinedTarget = (nonce, target) => {
    if (nonce <= target) {
        return true;
    } else {
        return false;
    }
};

const mineBlock = (blockchainTipHash) => {

    const nextBlock = {
        previousHash: blockchainTipHash,
        transactions: [123],
        target: '2000000ff114855f2cae409ebb44c8f812b2505e144ccb076feddfdcc08053e3',
        nonce: 0
    };

    let mined = false;

    while (!mined) {
        const nonce = Math.floor(Math.random()*1000);

        nextBlock.nonce = nonce;

        const nextBlockHash = makeHash(JSON.stringify(nextBlock));
        console.log('mining:', nonce, nextBlockHash);

        mined = verifyMinedTarget(nextBlockHash, nextBlock.target);
    }

    if (mined) {

        return nextBlock;
    } else {
        throw {error: 'mining error'};
    }
};

export { mineBlock };
