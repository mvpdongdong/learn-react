import { Component } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

class LoadingProgress extends Component {
  constructor (props) {
    super(props);
    NProgress.start();
  }

  render () {
    return null;
  }

  componentWillUnmount () {
    NProgress.done();
    console.log('loading unmount');
  }
}

export default LoadingProgress;
