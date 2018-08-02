import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import RouterMap from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouterMap />, document.getElementById('root'));
registerServiceWorker();
