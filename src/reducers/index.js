import { combineReducers } from 'redux';

import { loadingBarReducer } from 'react-redux-loading-bar';
import geojson from './geojson.reducer';
import options from './options.reducer';
import routes from './routes.reducer';

const reducers = combineReducers({
  geojson,
  options,
  routes,
  loadingBar: loadingBarReducer
});

export default reducers;
