import React from 'react';
import ReactDOM from 'react-dom';
import '~/assets/App.scss';
import RouterMap from './router';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(
  <RouterMap store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
