import { namespace } from '../constants/namespace';

const defaultState = {
  route: {},
  routeDisplay: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
  case namespace.ROUTES_GET_SUCCESS:
    return {
      ...state,
      route: action.data,
      routeDisplay: true
    };
  case namespace.ROUTES_DEL:
    return {
      ...state,
      route: {},
      routeDisplay: false
    };
  default:
    return state;
  }
};
