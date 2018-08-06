import React, { Component } from 'react';
import { ThemeContext } from './theme-context';

class ThemeButton extends Component {
  componentWillReceiveProps () {
    console.log('receive props');
  }
  componentWillUpdate () {
    console.log('update');
  }
  render () {
    console.log('render');
    return (
      <ThemeContext.Consumer>
        {
          theme => (
            <button
              {...this.props}
              style={{ backgroundColor: theme.background }}
            />
          )
        }
      </ThemeContext.Consumer>
    );
  }
  componentDidUpdate () {
    console.log('updated');
  }
}

export default ThemeButton;
