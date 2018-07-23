import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock';
import Toggle from './components/Toggle';

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
        <Welcome name="shendong"></Welcome>
        <Clock/>
        <Toggle/>
      </div>
    );
  }
}

function Welcome(props) {
  return (
    <h1>hello,{props.name}</h1>
  );
}

export default App;
