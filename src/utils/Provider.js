import { Component, Children } from 'react';
import propTypes from 'prop-types';

class Provider extends Component {
  static childPropTypes = {
    store: propTypes.object
  };

  getChildContext () {
    return this.props.store;
  }

  render () {
    return Children.only(this.props.children);
  }
}

export default Provider;
