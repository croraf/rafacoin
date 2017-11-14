

import { createStore, combineReducers } from 'redux';

import {blockchainReducer, transactionsReducer} from './reducers';
const store = createStore(
    combineReducers({
        blockchain: blockchainReducer,
        transactions: transactionsReducer
    })
);

export {store};
