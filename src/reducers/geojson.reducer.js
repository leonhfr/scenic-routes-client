import { namespace } from '../constants/namespace';

const defaultState = {
  bounds: {},
  boundsLoaded: false,
  heatmap: {},
  heatmapLoaded: false,
  interests: {},
  interestsLoaded: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
  case namespace.GEOJSON_HEATMAP_GET_SUCCESS:
    return {
      ...state,
      heatmap: action.data,
      heatmapLoaded: true
    };
  case namespace.GEOJSON_BOUNDS_GET_SUCCESS:
    return {
      ...state,
      bounds: action.data,
      boundsLoaded: true
    };
  case namespace.GEOJSON_INTERESTS_GET_SUCCESS:
    return {
      ...state,
      interests: action.data,
      interestsLoaded: true
    };
  default:
    return state;
  }
};
