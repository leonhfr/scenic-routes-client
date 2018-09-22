import { combineReducers } from 'redux';

import geojson from './geojson.reducer';

const reducers = combineReducers({
  geojson,
  // mock
});

export default reducers;
