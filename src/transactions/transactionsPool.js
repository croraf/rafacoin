import SortedMap from 'collections/sorted-map';

const myEquals = (a, b) => {
    
    return false;
};

const myCompare = (a, b) => {

    return /* a.value.tranaction.fee >= b.value.transaction.fee */ true;
};

const transactionPool = SortedMap(undefined, myEquals, myCompare);



export {transactionPool};


