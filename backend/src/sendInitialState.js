import {getMetadata} from './data/metaDAO';
import {getBlockFromDB} from './data/blockchainDAO';

const sendInitialState = async (ws) => {

    console.log('Sending initial state!');

    console.log('Sending initial blockchain state!');

    const blockchainArray = [];
    const blockchainMetadata = await getMetadata();
    console.log('metadata:', blockchainMetadata);

    let blockchainTipHashTemp = blockchainMetadata.blockchainTipHash;
    while (blockchainTipHashTemp) {

        const currentBlock = await getBlockFromDB(blockchainTipHashTemp);
        blockchainArray.push([blockchainTipHashTemp, currentBlock.block]);
        blockchainTipHashTemp = currentBlock.block.previousHash;
    }

    console.log('blockchainArray:', blockchainArray);
    
    ws.send(JSON.stringify({type: 'blockchain', data: blockchainArray}));
};

export {sendInitialState};
