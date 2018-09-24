import { namespace } from '../constants/namespace';

const emptyGeoJson = {
  type: 'FeatureCollection',
  features: []
};

const defaultState = {
  request: {...emptyGeoJson},
  response: {...emptyGeoJson}
};

export default (state = defaultState, action) => {
  switch (action.type) {
  case namespace.ROUTES_GET_SUCCESS:
    return {
      ...state,
      response: action.data.routes[0].geometry
    };
  case namespace.ROUTES_DEL:
    return {
      ...state,
      response: {...emptyGeoJson}
    };
  case namespace.ROUTES_ADD_WAYPOINT:
    return {
      ...state,
      request: {
        type: 'FeatureCollection',
        features: [...state.request.features, {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              action.data.lng,
              action.data.lat
            ]
          }
        }]
      }
    };
  case namespace.ROUTES_DEL_WAYPOINTS:
    return {
      ...state,
      request: {...emptyGeoJson}
    };
  default:
    return state;
  }
};
