

import { createStore, combineReducers } from 'redux';

import {blockchainReducer, transactionsReducer, UTxOReducer, miningReducer, websocketReducer} from './reducers';

import { reducer as formReducer } from 'redux-form';

const store = createStore(
    combineReducers({
        blockchain: blockchainReducer,
        transactions: transactionsReducer,
        UTxO: UTxOReducer,
        form: formReducer,
        mining: miningReducer,
        websocket: websocketReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export {store};
