import { namespace } from '../constants/namespace';

const options = [
  {
    name: 'Heatmap',
    layers: ['heatmap', 'interests']
  },
  {
    name: 'Scenic Routes',
    layers: ['scenic-routes']
  }
];

const defaultState = {
  options,
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
