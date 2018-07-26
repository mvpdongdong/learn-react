import React, { Component } from 'react';
import ThemedButton from './theme-button';
import { ThemeContext, themes } from './theme-context';

class Context extends Component {
  constructor (props) {
    super(props);
    this.state = {
      theme: themes.light
    };
  }

  toggleTheme = () => {
    this.setState(preState => ({
      theme: preState.theme === themes.light ? themes.dark : themes.light
    }));
  };

  render () {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <Toolbar changeTheme={this.toggleTheme}/>
      </ThemeContext.Provider>
    );
  }
}

function Toolbar (props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

export default Context;
