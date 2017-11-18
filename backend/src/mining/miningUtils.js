
import {blockchain, blockchainTipHash, blockchainHeight} from '../blockchain';
import {makeHash} from '../hashing';
import {selectTransactionsToMine, removeTransactionsFromPool} from '../transactions/selectTransactions';

import {addTransactionsToUTxO, removeOldUTxO} from '../transactions/unspentTransactionOutputs';

const verifyMinedTarget = (nonce, target) => {
    if (nonce <= target) {
        return true;
    } else {
        return false;
    }
};

const generateCoinbase = () => {

    const coinbaseTransaction = {
        transaction: {
            inputs: [
                {txHash: 'coinbase', outputIndex: blockchainHeight+1}
            ],
            outputs: [
                {address: 'rafa', amount: 25}
            ],
            fee: 0
        }
    };

    const coinbaseTransactionWithHash = [
        makeHash(JSON.stringify(coinbaseTransaction)), 
        coinbaseTransaction
    ];

    return coinbaseTransactionWithHash;
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
    let nextBlockHash;

    while (!mined) {

        miningTries++;

        nextBlock.nonce = nonce;
        nextBlockHash = makeHash(JSON.stringify(nextBlock));
        mined = verifyMinedTarget(nextBlockHash, nextBlock.target);

        nonce++;
    }

    if (mined) {

        removeTransactionsFromPool(selectedTransactions);
        removeOldUTxO(selectedTransactions);
        addTransactionsToUTxO(transactions, nextBlockHash);
        return nextBlock;
    } else {
        throw {error: 'mining error'};
    }
};

export { mineBlock };
