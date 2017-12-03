
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
        
        console.log('New transaction received: \n', action.transaction);
        return [action.transaction, ...state];
      case 'deleteTransaction':
        console.log('remove from pool:', action.transactionHash);
        console.log(state);
        return state.filter(item => {return item[0] !== action.transactionHash});
      default:
        return state;
    }
}

const UTxOReducer = (state = [], action) => {
    switch(action.type){
      case 'UTxO':
        console.log('UTxO data:', action.data);
        return action.data;
      default:
        return state;
    }
}

const miningReducer = (state=false, action) => {
    switch (action.type) {
        case 'miningInfo':
            if (action.data === 'miningStarted') {return true;}
            else if (action.data === 'miningFinished') {return false;}
            else {console.log('wrong message type');}
            break;
        default:
            return state;
    }
}

const websocketReducer = (state = 'closed', action) => {
    switch(action.type){
          case 'websocket':
               console.log(action.data);
               return action.data;
          default:
               return state;
    }
}

/* const accountInfoReducer = (state={}, action) => {

    switch(action.type){
        case 'accountInfo':
            console.log(action.data);
            return action.data;
        default:
            return state;
    }

} */

const addressInfoReducer = (state=[], action) => {

    switch(action.type){
        case 'addressInfo':
            console.log(action.data);
            return action.data;
        case 'newAddress':
            return [...state, action.data];
        default:
            return state;
    }

}

export {blockchainReducer, transactionsReducer, UTxOReducer, miningReducer, websocketReducer, addressInfoReducer};
