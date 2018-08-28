import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import '~/assets/App.scss';
import RouterMap from './routes';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import callApiMiddleware from './middlewares/callApiMiddleware';

const store  = createStore(
  reducers,
  compose(
    applyMiddleware(callApiMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(RouterMap);

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(RouterMap);
  });
}
registerServiceWorker();
