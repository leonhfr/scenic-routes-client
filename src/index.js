import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import apiClient from './middlewares/api';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import App from './containers/App';

const store = createStore(reducers, applyMiddleware(apiClient, logger));
const theme = createMuiTheme();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
