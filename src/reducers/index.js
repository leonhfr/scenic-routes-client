import { combineReducers } from 'redux';

import { loadingBarReducer } from 'react-redux-loading-bar';
import geojson from './geojson.reducer';
import options from './options.reducer';

const reducers = combineReducers({
  geojson,
  options,
  loadingBar: loadingBarReducer
});

export default reducers;
