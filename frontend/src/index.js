import ReactDOM from 'react-dom';
import React from 'react';

import {Main} from './Main';
import { Provider } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {store} from './redux/store';

ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider>
          <Main />
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
