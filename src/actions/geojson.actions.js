import { namespace } from '../constants/namespace';

export const getBounds = () => ({
  type: namespace.GEOJSON_BOUNDS_GET,
  api: {
    endpoint: '/map/boundaries'
  }
});

export const getHeatmap = () => ({
  type: namespace.GEOJSON_HEATMAP_GET,
  api: {
    endpoint: '/data/heatmap.geo.json'
  }
});

export const getInterests = () => ({
  type: namespace.GEOJSON_INTERESTS_GET,
  api: {
    endpoint: '/data/interests.geo.json'
  }
});
