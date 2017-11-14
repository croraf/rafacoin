
const blockchainReducer = (state = [], action) => {
    switch(action.type){
      case 'blockchain':
        return action.blockchain;
      default:
        return state;
    }
};

export {blockchainReducer};
