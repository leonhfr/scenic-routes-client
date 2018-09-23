import { combineReducers } from 'redux';

import geojson from './geojson.reducer';
import options from './options.reducer';

const reducers = combineReducers({
  geojson,
  options
});

export default reducers;
