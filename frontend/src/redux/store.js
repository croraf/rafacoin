

import { createStore, combineReducers } from 'redux';

import {blockchainReducer, transactionsReducer} from './reducers';

import { reducer as formReducer } from 'redux-form';

const store = createStore(
    combineReducers({
        blockchain: blockchainReducer,
        transactions: transactionsReducer,
        form: formReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export {store};
