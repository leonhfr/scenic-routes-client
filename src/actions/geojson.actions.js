import { namespace } from '../constants/namespace';

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
