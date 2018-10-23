// const BASE_URL =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:4000'
//     : 'https://scenicroutes.herokuapp.com';

const BASE_URL = 'https://scenicroutes.herokuapp.com';

export default store => next => action => {
  if (!action.api) return next(action);

  const defaultHeaders = {};
  const { endpoint, method } = action.api;
  let { body, headers } = action.api;

  if (body) {
    body = JSON.stringify(body);
    defaultHeaders['Content-type'] = 'application/json';
  }

  headers = {
    ...defaultHeaders,
    ...headers
  };

  next({
    ...action,
    type: `${action.type}_REQUEST`
  });

  fetch(`${BASE_URL}${endpoint}`, {
    method: method || 'GET',
    body,
    headers
  })
    .then(response => response.json())
    .then(data => {
      store.dispatch({
        ...action,
        type: `${action.type}_SUCCESS`,
        api: undefined,
        data
      });
    })
    .catch(error => {
      store.dispatch({
        ...action,
        type: `${action.type}_FAILURE`,
        api: undefined,
        error
      });
    });
};
