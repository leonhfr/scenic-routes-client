import { namespace } from '../constants/namespace';

import { layers } from '../containers/Map.config';

const options = [
  {
    name: 'Heatmap',
    id: 'heatmap',
    tooltip: 'A heatmap of Barcelona representing the locations of the 10,000 most interesting Flickr pictures taken in that area. Zoom in, and the photos are clustered into interesting points. The more pictures have been taken at a point, the more interesting it is.'
  },
  {
    name: 'Scenic Routes',
    id: 'scenicRoutes',
    tooltip: 'Get routed through interesting points. One click to set A. The second click set B. The route is then fetched and displayed. The third click reset the map.'
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
