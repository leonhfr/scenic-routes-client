import { namespace } from '../constants/namespace';

export const getBounds = (data) => ({
  type: namespace.GEOJSON_BOUNDS_GET,
  api: {
    endpoint: '/map/boundaries'
  }
});

export const getHeatmap = (data) => ({
  type: namespace.GEOJSON_HEATMAP_GET,
  api: {
    endpoint: '/data/heatmap.geo.json'
  }
});

export const getInterests = (data) => ({
  type: namespace.GEOJSON_INTERESTS_GET,
  api: {
    endpoint: '/data/interests.geo.json'
  }
});
