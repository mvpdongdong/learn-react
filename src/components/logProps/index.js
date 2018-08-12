import React, { Component } from 'react';

function logProps (WrappedComponent) {
  class LogProps extends Component {
    componentDidUpdate (prevProps) {
      console.log('old props', prevProps);
      console.log('new props', this.props);
    }

    render () {
      const { forwardRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardRef} {...rest}/>;
    }
  }

  function forwardRef (props, ref) {
    return <LogProps forwardRef={ref} {...props}/>;
  }

  const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  forwardRef.displayName = `logProps${name}`;

  return React.forwardRef(forwardRef);
}

export default logProps;
