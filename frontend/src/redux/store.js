

import { createStore } from 'redux';

import {blockchainReducer} from './reducers';
const store = createStore(blockchainReducer);

export {store};
