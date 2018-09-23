import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import apiClient from './middlewares/api';

import './index.css';
import App from './containers/App';

const store = createStore(
  reducers,
  applyMiddleware(apiClient, logger),
  applyMiddleware(loadingBarMiddleware({
    promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']
  }))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

registerServiceWorker();
