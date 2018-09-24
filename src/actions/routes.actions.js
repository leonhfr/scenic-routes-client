import { namespace } from '../constants/namespace';

export const getBounds = (data) => ({
  type: namespace.ROUTES_GET,
  api: {
    endpoint: '/routes'
  }
});
