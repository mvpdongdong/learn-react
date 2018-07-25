import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock';
import Toggle from './components/Toggle';
import NameForm from './components/NameForm';
import ThemedButton from './components/Theme/theme-button';
import { ThemeContext, themes } from './components/Theme/theme-context';
import FancyButton from './components/FancyButton';
import logProps from './components/logProps';

const numbers = [1,2,3,4,5];
const ref = React.createRef();
const HocFancyButton = logProps(FancyButton);
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      theme: themes.light
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme () {
    this.setState(preState => ({
      theme: preState.theme === themes.light ? themes.dark : themes.light
    }));
  }

  componentDidMount () {
    ref.current.focus();
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h2>函数式组件</h2>
        <Welcome name="shendong"></Welcome>
        <h2>状态组件更新状态</h2>
        <Clock/>
        <h2>绑定事件</h2>
        <Toggle/>
        <h2>列表循环</h2>
        <NumberList numbers={numbers}/>
        <h2>受控组件\状态提升</h2>
        <NameForm>hello</NameForm>
        <h2>上下文context</h2>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <h2>ref引用dom或组件</h2>
        <CustomTextInput/>
        <h2>转发refs，获得子组件dom引用</h2>
        <HocFancyButton ref={ref}>Click me!</HocFancyButton>
        <footer className="App-footer">2018</footer>
      </div>
    );
  }
}

function Welcome (props) {
  return (
    <h1>hello,{props.name}</h1>
  );
}

function NumberList (props) {
  const { numbers } = props;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

function Toolbar (props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

function CustomTextInput (props) {
  // textInput必须在这里声明，所以 ref 回调可以引用它
  let textInput = null;

  function handleClick () {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />

      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}

export default App;
