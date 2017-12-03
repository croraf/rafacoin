import {getMetadata} from './data/metaDAO';
import {getBlockFromDB} from './data/blockchainDAO';

import {blockchainMetadata} from './blockchain';


import {getUTxO} from './data/utxoDAO';

import {getBlockchainArray} from './blockchain';

const sendDatabaseState = async (ws) => {

    console.log('Sending database state!');


    console.log('Sending blockchain state!');
    const blockchainArray = await getBlockchainArray();
    ws.send(JSON.stringify({type: 'blockchain', data: blockchainArray}));


    console.log('Sending UTxO state!');
    const AllUTxO = await getUTxO();
    ws.send(JSON.stringify({type: 'UTxO', data: AllUTxO}));
};




export {sendDatabaseState};
