import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import callApiMiddleware from './middlewares/callApiMiddleware';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(callApiMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
