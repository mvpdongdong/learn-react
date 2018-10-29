import React, { Component } from 'react';
import { ThemeContext } from './theme-context';

class ThemeButton extends Component {
  static contextType = ThemeContext;
  componentWillReceiveProps () {

  }
  componentWillUpdate () {

  }
  render () {
    const theme = this.context;
    return (
      // <ThemeContext.Consumer>
      //   {
      //     theme => (
      //       <button
      //         {...this.props}
      //         style={{ backgroundColor: theme.background }}
      //       />
      //     )
      //   }
      // </ThemeContext.Consumer>
      <button
        {...this.props}
        style={{ backgroundColor: theme.background }}
      />
    );
  }
  componentDidUpdate () {

  }
}

export default ThemeButton;
