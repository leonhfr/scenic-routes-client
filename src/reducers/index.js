import { combineReducers } from 'redux';

import geojson from './geojson.reducer';

const reducers = combineReducers({
  geojson,
});

export default reducers;
