import { namespace } from '../constants/namespace';

export const getRoutes = (endpoint) => ({
  type: namespace.ROUTES_GET,
  api: {
    endpoint: '/routes/' + endpoint
  }
});

export const delRoutes = (endpoint) => ({
  type: namespace.ROUTES_DEL
});

export const addWaypoint = (waypoint) => ({
  type: namespace.ROUTES_ADD_WAYPOINT,
  data: waypoint
});

export const delWaypoints = () => ({
  type: namespace.ROUTES_DEL_WAYPOINTS
});
