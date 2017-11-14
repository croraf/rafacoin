
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
      default:
        return state;
    }
}

export {blockchainReducer, transactionsReducer};
