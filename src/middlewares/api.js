// ACTION EXAMPLE
//
// const action = {
//   type: '...'
//   api: {
//     endpoint:,
//     body:,
//     headers:,
//     …
//   }
// }

const BASE_URL = 'http://localhost:3000';

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
    ...headers,
  };

  next({
    ...action,
    type: `${action.type}_REQUEST`
  });

  fetch(`${BASE_URL}${endpoint}`, {
    method: method || 'GET',
    body,
    headers,
  })
    .then(response => response.json())
    .then(data => {
      store.dispatch({
        ...action,
        type: `${action.type}_SUCCESS`,
        api: undefined,
        data,
      });
    })
    .catch(error => {
      store.dispatch({
        ...action,
        type: `${action.type}_FAILURE`,
        api: undefined,
        error,
      });
    });
};
