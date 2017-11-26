

import {constructAndMineBlock} from './miningWrapper';
import { log1 } from '../utilities';
import { websockets } from '../websockets';

let mining = false;

const miningEndpoint = () => {
    
    if (mining === false) {

        mining = true;
        log1('Starting mining', '');
        websockets[0].send(JSON.stringify({type: 'miningInfo', data: 'miningStarted'}));

        constructAndMineBlock();
    }
}

const setMiningFinished = () => {
    
    mining = false;

    websockets[0].send(JSON.stringify({type: 'miningInfo', data: 'miningFinished'}));
    log1('Mining finished', '');
}

export {miningEndpoint, setMiningFinished};





/* const miningLoop = (index) => {
    
    log1('Next mining cycle:' + index, '');

    console.log('tip:', blockchainTipHash);
    const minedBlock = mineBlock();


    if (index === 0) {
        log1('blockchain:', blockchain);
        websockets[0].send(JSON.stringify({note: 'Mining finished!!!'}));
    }
    else {setTimeout(() => {miningLoop(index-1);}, 10);}
};
    */ 