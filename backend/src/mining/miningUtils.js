
import {blockchain, blockchainTipHash} from '../blockchain';
import {makeHash} from '../hashing';
import {selectTransactionsToMine, removeTransactionsFromPool} from '../transactions/selectTransactions';

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

import {log1} from '../utilities';

const mineBlock = () => {

    const coinbase = generateCoinbase();

    const selectedTransactions = selectTransactionsToMine();

    const transactions = [coinbase].concat(selectedTransactions);

    log1('Transactions:', transactions);

    const nextBlock = {
        previousHash: blockchainTipHash,
        transactions: transactions,
        target: blockchain[blockchainTipHash].target,
        nonce: 0
    };

    let mined = false;
    let miningTries = 0;
    let nonce = 0;

    while (!mined) {

        miningTries++;

        nextBlock.nonce = nonce;
        const nextBlockHash = makeHash(JSON.stringify(nextBlock));
        mined = verifyMinedTarget(nextBlockHash, nextBlock.target);

        nonce++;
    }

    if (mined) {

        removeTransactionsFromPool(selectedTransactions);
        return nextBlock;
    } else {
        throw {error: 'mining error'};
    }
};

export { mineBlock };
