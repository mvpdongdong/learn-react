import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import callApiMiddleware from './middlewares/callApiMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(callApiMiddleware)
  )
);

export default store;
