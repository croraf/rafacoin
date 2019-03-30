import ReactDOM from 'react-dom';
import React from 'react';

import {Main} from './Main';
import { Provider } from 'react-redux';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import {store} from './redux/store';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

import { install } from '@material-ui/styles';

install();

ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider theme={theme}>
          <Main />
      </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
