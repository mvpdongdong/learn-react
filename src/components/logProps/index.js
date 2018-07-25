import React from 'react';

function logProps (Component) {
  class LogProps extends React.Component {
    componentDidUpdate (prevProps) {
      console.log('old props', prevProps);
      console.log('new props', this.props);
    }

    render () {
      const { forwardRef, ...rest } = this.props;

      return <Component ref={forwardRef} {...rest}/>;
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps forwardRef={ref} {...props}/>;
  });
}

export default logProps;
