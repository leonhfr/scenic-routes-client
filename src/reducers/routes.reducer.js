import { namespace } from '../constants/namespace';

const defaultState = {
  route: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
  case namespace.ROUTES_GET_SUCCESS:
    return {
      ...state,
      route: action.data,
      routeLoaded: true
    };
  default:
    return state;
  }
};
