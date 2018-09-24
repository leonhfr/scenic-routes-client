import { namespace } from '../constants/namespace';

import { layers } from '../containers/Map.config';

const options = [
  {
    name: 'Heatmap',
    id: 'heatmap'
  },
  {
    name: 'Scenic Routes',
    id: 'scenicRoutes'
  }
];

const defaultState = {
  options,
  layers,
  active: options[0]
};

export default (state = defaultState, action) => {
  switch (action.type) {
  case namespace.SET_ACTIVE_OPTION:
    return {
      ...state,
      active: action.option
    };
  default:
    return state;
  }
};
