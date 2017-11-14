
import {blockchain, blockchainTipHash, addToBlockchain} from '../blockchain';
import {mineBlock} from './miningUtils';
import {log1} from '../utilities';

import {websockets} from '../websockets';

const startMining = () => {

    log1('blockchain:', blockchain);

    for (let i = 0; i < 5; i++){

        log1('Next mining cycle:' + i, '');

        console.log('tip:', blockchainTipHash);
        const minedBlock = mineBlock();

        try {
            websockets[0].send(JSON.stringify(minedBlock));
            addToBlockchain(minedBlock);
        } catch (error) {
            console.log('ERROR:',error.reason);
        }
        
    }


    log1('blockchain:', blockchain);
};


export {startMining};

