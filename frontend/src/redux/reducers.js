
const blockchainReducer = (state = [], action) => {
    switch(action.type){
      case 'blockchain':
        return action.blockchain;
      case 'newBlock':
        return [action.block, ...state];
      default:
        return state;
    }
};

const transactionsReducer = (state = [], action) => {
    switch(action.type){
      case 'transactions':
        return action.transactions;
      case 'newTransaction':
        return [action.transaction, ...state];
      case 'deleteTransaction':
        console.log('remove from pool:', action.transactionHash);
        console.log(state);
        return state.filter(item => {return item[0] !== action.transactionHash});
      default:
        return state;
    }
}

export {blockchainReducer, transactionsReducer};
