import { namespace } from '../constants/namespace';

export const getRoutes = (endpoint) => ({
  type: namespace.ROUTES_GET,
  api: {
    endpoint: '/routes/' + endpoint
  }
});

export const delRoutes = () => ({
  type: namespace.ROUTES_DEL
});
