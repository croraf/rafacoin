
import {getAllUTxO} from './data/utxoDAO';

import {getBlockchainArray} from './blockchain';

import {getTransactionsFromDB} from './data/transactionsDAO';

const sendDatabaseState = async (ws) => {

    console.log('Sending database state!');


    console.log('Sending blockchain state!');
    const blockchainArray = await getBlockchainArray();
    ws.send(JSON.stringify({type: 'blockchain', data: blockchainArray}));


    console.log('Sending UTxO state!');
    const AllUTxO = await getAllUTxO();
    ws.send(JSON.stringify({type: 'UTxO', data: AllUTxO}));


    console.log('Sending transactions pool state!');
    const transactionsPool = await getTransactionsFromDB();
    ws.send(JSON.stringify({type: 'transactionsPool', data: transactionsPool}));
};




export {sendDatabaseState};
