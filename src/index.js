import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import RouterMap from './routes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouterMap />, document.getElementById('root'));
registerServiceWorker();
