import React from 'react';
import ReactDOM from 'react-dom';
import '~/assets/App.scss';
import RouterMap from './routes';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducers from './reducers';

const store  = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<RouterMap store={store} />, document.getElementById('root'));
registerServiceWorker();
