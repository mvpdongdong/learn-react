import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock';
import Toggle from './components/Toggle';
import NameForm from './components/NameForm';

const numbers = [1,2,3,4,5];
class App extends Component {
  render() {
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
        <h2>受控组件</h2>
        <NameForm/>
        <h2>状态提升</h2>
        
      </div>
    );
  }
}

function Welcome(props) {
  return (
    <h1>hello,{props.name}</h1>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

export default App;
