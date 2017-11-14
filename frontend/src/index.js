import ReactDOM from 'react-dom';
import React from 'react';

import {Main} from './Main';
import { Provider } from 'react-redux';

import {store} from './redux/store';

ReactDOM.render(
  <Provider store={store}>
      <Main />
  </Provider>,
  document.getElementById('root')
);
