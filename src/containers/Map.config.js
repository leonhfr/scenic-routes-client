export const computeBounds = (p) => {
  const o = 0.1;
  const w = p[2] - p[0];
  const h = p[3] - p[1];
  const lng = p[0] + w / 2;
  const lat = p[1] + h / 2;
  const maxBounds = [
    [p[0] -o*w, p[1] -o*h],
    [p[2] +o*w, p[3] +o*h]
  ];
  return {
    lng,
    lat,
    maxBounds
  };
};

export const getEndpoint = (data) => {
  // TODO: refactor to receive geojson.data as arg
  // TODO: refactor to route without slashes
  const endpoint = [];
  for (let point of data.features) {
    for (let coord of point.geometry.coordinates) {
      endpoint.push(coord.toFixed(5));
    }
  }
  return endpoint.join('/');
};

export const minzoom = 15;
export const maxzoom = 16;

export const layers = {
  heatmap: ['heatmap', 'interests'],
  scenicRoutes: [
    'scenic-routes-input',
    'scenic-routes-startend',
    'scenic-routes-interests',
    'scenic-routes-others',
    'scenic-routes-line'
  ]
};

export const heatmapLayer = {
  id: 'heatmap',
  type: 'heatmap',
  source: 'heatmap',
  layout: {
    visibility: 'none'
  },
  maxzoom,
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    'heatmap-weight': [
      'interpolate',
      [ 'linear' ],
      [ 'get', 'pics' ],
      0, 0,
      20, 1
    ],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    'heatmap-intensity': [
      'interpolate',
      [ 'linear' ],
      [ 'zoom' ],
      0, 1,
      20, 3
    ],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    'heatmap-color': [
      'interpolate',
      [ 'linear' ],
      [ 'heatmap-density' ],
      0, 'rgba(33,102,172,0)',
      0.2, 'rgb(103,169,207)',
      0.4, 'rgb(209,229,240)',
      0.6, 'rgb(253,219,199)',
      0.8, 'rgb(239,138,98)',
      1, 'rgb(178,24,43)'
    ],
    // Adjust the heatmap radius by zoom level
    'heatmap-radius': [
      'interpolate',
      [ 'linear' ],
      [ 'zoom' ],
      0, 2,
      maxzoom, 16
    ],
    // Transition from heatmap to circle layer by zoom level
    'heatmap-opacity': [
      'interpolate',
      [ 'linear' ],
      [ 'zoom' ],
      minzoom, 1,
      maxzoom, 0
    ]
  }
};

export const interestsLayer = {
  id: 'interests',
  type: 'circle',
  source: 'interests',
  layout: {
    visibility: 'none'
  },
  minzoom,
  paint: {
    'circle-radius': [
      'interpolate',
      [ 'linear' ],
      [ 'zoom' ],
      minzoom, [
        'interpolate',
        [ 'linear' ],
        [ 'get', 'pics' ],
        1, 1,
        8, 4
      ],
      maxzoom, [
        'interpolate',
        [ 'linear' ],
        [ 'get', 'pics' ],
        1, 8,
        160, 40
      ]
    ],
    'circle-color': 'rgb(178,24,43)',
    'circle-blur': 0.8,
    'circle-opacity': 0.8
  }
};

export const routesInputLayer = {
  id: 'scenic-routes-input',
  type: 'circle',
  source: 'scenic-routes-request',
  layout: {
    visibility: 'none'
  },
  paint: {
    'circle-radius': 12,
    'circle-opacity': .5,
    'circle-color': '#3bb2d0',
    'circle-stroke-color': '#3bb2d0',
    'circle-stroke-width': 2
  }
};

export const routesLineLayer = {
  id: 'scenic-routes-line',
  type: 'line',
  source: 'scenic-routes-response',
  layout: {
    visibility: 'none',
    'line-join': 'round',
    'line-cap': 'round'
  },
  filter: ['==', 'line', [ 'get', 'forLayer' ]],
  paint: {
    'line-color': '#3bb2d0',
    'line-width': 4,
    'line-opacity': 1,
    'line-dasharray': [0, 1.5]
  }
};

export const routesStartEndLayer = {
  id: 'scenic-routes-startend',
  type: 'circle',
  source: 'scenic-routes-response',
  layout: {
    visibility: 'none'
  },
  filter: ['==', 'startend', [ 'get', 'forLayer' ]],
  paint: {
    'circle-radius': 12,
    'circle-color': '#3bb2d0'
  }
};

export const routesInterestsLayer = {
  id: 'scenic-routes-interests',
  type: 'circle',
  source: 'scenic-routes-response',
  layout: {
    visibility: 'none'
  },
  filter: ['==', 'interests', [ 'get', 'forLayer' ]],
  paint: {
    'circle-radius': 12,
    'circle-opacity': 0,
    'circle-stroke-color': '#3bb2d0',
    'circle-stroke-width': 2,
  }
};

export const routesOthersLayer = {
  id: 'scenic-routes-others',
  type: 'circle',
  source: 'scenic-routes-response',
  layout: {
    visibility: 'none'
  },
  filter: ['==', 'others', [ 'get', 'forLayer' ]],
  paint: {
    'circle-radius': 6,
    'circle-opacity': 0,
    'circle-stroke-color': '#3bb2d0',
    'circle-stroke-width': 1,
  }
};
