
import {blockchain, blockchainTipHash, addToBlockchain} from '../blockchain';
import {mineBlock} from './miningUtils';
import {makeHash} from '../hashing';
import {log1} from '../utilities';

import {websockets} from '../websockets';

const startMining = (index) => {

    log1('Next mining cycle:' + index, '');

    console.log('tip:', blockchainTipHash);
    const minedBlock = mineBlock();

    try {
        websockets[0].send(JSON.stringify({
            type: 'newBlock', 
            data: [makeHash(JSON.stringify(minedBlock)), minedBlock]}
        ));
        addToBlockchain(minedBlock);
    } catch (error) {
        console.log('ERROR:',error.reason);
    }

    if (index === 0) {
        log1('blockchain:', blockchain);
        websockets[0].send(JSON.stringify({note: 'Mining finished!!!'}));
    }
    else {setTimeout(() => {startMining(index-1);}, 10);}
};


export {startMining};

