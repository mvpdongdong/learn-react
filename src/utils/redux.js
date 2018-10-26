function createStore (reducer, fn) {
  let state;
  let listeners = [];
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(fn => fn());
  };
  dispatch({ type: '@INIT' });

  // createStore(reducer,applyMiddleware(...middlewares))一步到位
  // 在内部使用applyMiddleware(...middlewares)(createStore)(reducer)
  if (typeof fn === 'function') {
    return fn(createStore)(reducer);
  }
  const getState = ()=> JSON.parse(JSON.stringify(state));
  const subscribe = fn => {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  };
  return {
    getState,
    subscribe,
    dispatch
  };
}

function bindActionCreators (actions, dispatch) {
  const obj = {};
  for (let key in actions) {
    obj[key] = (...args) => dispatch(actions[key](...args));
  }
  return obj;
}

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const obj = {};
    for (let key in reducers) {
      obj[key] = reducers[key](state[key], action);
    }
    return obj;
  };
};

const applyMiddleware = (...middlewares) => (createStore) => (reducer) => {
  const store = createStore(reducer);
  const fns = middlewares.map(middleware => {
    return middleware(store);
  });
  const newDispatch = compose(...fns)(store.dispatch);
  return { ...store, dispatch: newDispatch };
};

function compose (...args) {
  return args.reduce((a, b) => ((...args) => a(b(...args))));
}

export  {
  createStore,
  bindActionCreators,
  combineReducers,
  compose,
  applyMiddleware
};
