const callApiMiddleware = ({ dispatch, getState }) => next => action => {
  const {
    types,
    callApi,
    shouldCallApi = () => true,
    payload = {}
  } = action;

  if (!types) {
    return next(action);
  }

  if (
    !Array.isArray(types) ||
    types.length !== 3 ||
    !types.every(type => typeof type === 'string')
  ) {
    throw new Error('Expected an array of three string types.');
  }

  if (typeof callApi !== 'function') {
    throw new Error('Expected callApi to be a function.');
  }

  if (!shouldCallApi(getState())) {
    return;
  }

  const [requestType, successType, failureType] = types;
  dispatch({
    type: requestType,
    ...payload
  });

  return callApi().then(
    response => {
      console.log(response);
      dispatch({
        type: successType,
        ...payload,
        response,
      });
    },
    error => {
      dispatch({
        type: failureType,
        ...payload,
        error
      });
    }
  );
};

export default callApiMiddleware;
