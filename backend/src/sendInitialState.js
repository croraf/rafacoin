import {getMetadata} from './data/metaDAO';
import {getBlockFromDB} from './data/blockchainDAO';

import {blockchainMetadata} from './blockchain';

const sendInitialState = async (ws) => {

    console.log('Sending initial state!');

    console.log('Sending initial blockchain state!');

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

    console.log('blockchainArray:', blockchainArray);
    
    ws.send(JSON.stringify({type: 'blockchain', data: blockchainArray}));
};

export {sendInitialState};
