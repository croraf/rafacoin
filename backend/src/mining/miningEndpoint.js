

const {startMining} = require('./miningWrapper');
const { log1 } = require('../utilities');
const { websockets } = require('../websockets');

let mining = false;

const miningEndpoint = () => {
    
    if (mining === false) {

        mining = true;
        log1('Starting mining', '');
        websockets[0].send(JSON.stringify({type: 'miningInfo', data: 'miningStarted'}));

        startMining();
    }
}

const setMiningFinished = () => {
    
    mining = false;

    websockets[0].send(JSON.stringify({type: 'miningInfo', data: 'miningFinished'}));
    log1('Mining finished', '');
}

module.exports = {miningEndpoint, setMiningFinished};





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
