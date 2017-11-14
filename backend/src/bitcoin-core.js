
import {createTransactions} from './transactions/createTransactions';


createTransactions();




import {blockchain, blockchainTipHash, addToBlockchain} from './blockchain';
import {mineBlock} from './mining';
import {log1} from './utilities';

log1('blockchain:', blockchain);

for (let i = 0; i < 10; i++){

    log1('Next mining cycle:' + i, '');

    console.log('tip:', blockchainTipHash);
    const minedBlock = mineBlock();

    try {
        addToBlockchain(minedBlock);
    } catch (error) {
        console.log(error.reason);
    }
    
}


log1('blockchain:', blockchain);

