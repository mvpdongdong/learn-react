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

function bindActionCreator (actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

function bindActionCreators (actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? 'null' : typeof actionCreators
      }. ` +
        'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
    );
  }

  const boundActionCreators = {};
  const keys = Object.keys(actionCreators);
  keys.forEach(key => {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  });
  return boundActionCreators;
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

function compose (...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => ((...args) => a(b(...args))));
}

export  {
  createStore,
  bindActionCreators,
  combineReducers,
  compose,
  applyMiddleware
};
