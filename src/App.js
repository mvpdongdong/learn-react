import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock';
import Toggle from './components/Toggle';
import NameForm from './components/NameForm';
import Context from './components/Theme/Context';
import FancyButton from './components/FancyButton';
import logProps from './components/logProps';
import message from './components/Message';

const numbers = [1,2,3,4,5];
const ref = React.createRef();
const HocFancyButton = logProps(FancyButton);
class App extends Component {

  componentDidMount () {
    ref.current.focus();
  }

  handleClick = () => {
    message({
      message: 'hello',
      type: 'info',
      showClose: true
    });
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
        <Context/>
        <h2>ref引用dom或组件</h2>
        <CustomTextInput/>
        <h2>转发refs，获得子组件dom引用</h2>
        <HocFancyButton ref={ref}>Click me!</HocFancyButton>
        <h2>message组件</h2>
        <button onClick={this.handleClick}>点击</button>
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
