
import {blockchain, blockchainTipHash} from './blockchain';
import {makeHash} from './hashing';
import {selectTransactions} from './transactions/selectTransactions';

const verifyMinedTarget = (nonce, target) => {
    if (nonce <= target) {
        return true;
    } else {
        return false;
    }
};

const generateCoinbase = () => {
    const coinbase = {
        outputs: [
            {address: 'rafa', value: 25}
        ]
    };

    return coinbase;
};

const mineBlock = () => {

    const coinbase = generateCoinbase();

    const selectedTransactions = [coinbase].concat(selectTransactions());

    const nextBlock = {
        previousHash: blockchainTipHash,
        transactions: selectedTransactions,
        target: blockchain[blockchainTipHash].target,
        nonce: 0
    };

    let mined = false;
    let miningTries = 0;

    while (!mined) {
        const nonce = Math.floor(Math.random()*100000000);

        nextBlock.nonce = nonce;

        const nextBlockHash = makeHash(JSON.stringify(nextBlock));
        
        miningTries++;

        mined = verifyMinedTarget(nextBlockHash, nextBlock.target);
    }

    console.log('mining tries:', miningTries);

    if (mined) {
        return nextBlock;
    } else {
        throw {error: 'mining error'};
    }
};

export { mineBlock };
