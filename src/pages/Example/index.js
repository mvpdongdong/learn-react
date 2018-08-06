import React, { Component } from 'react';
import Clock from '~/components/Clock';
import Toggle from '~/components/Toggle';
import NameForm from '~/components/NameForm';
import Context from '~/components/Theme/Context';
import FancyButton from '~/components/FancyButton';
import logProps from '~/components/logProps';
import Card from '~/components/Card';
import ReduxIndex from '~/components/Redux/Index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import themeReducer from '~/reducers/themeReducer';

const numbers = [1,2,3,4,5];
const ref = React.createRef();
const HocFancyButton = logProps(FancyButton);
const store = createStore(themeReducer);
class Example extends Component {

  componentDidMount () {
    // ref.current.focus();
  }

  render () {
    return (
      <div className="App">
        <Card>
          <h2>函数式组件</h2>
          <Welcome name="shendong"></Welcome>
        </Card>
        <Card>
          <h2>状态组件更新状态</h2>
          <Clock/>
        </Card>
        <Card>
          <h2>绑定事件</h2>
          <Toggle/>
        </Card>
        <Card>
          <h2>列表循环</h2>
          <NumberList numbers={numbers}/>
        </Card>
        <Card>
          <h2>受控组件\状态提升</h2>
          <NameForm>hello</NameForm>
        </Card>
        <Card>
          <h2>上下文context</h2>
          <Context/>
        </Card>
        <Card>
          <h2>ref引用dom或组件</h2>
          <CustomTextInput/>
        </Card>
        <Card>
          <h2>转发refs，获得子组件dom引用</h2>
          <HocFancyButton ref={ref}>Click me!</HocFancyButton>
        </Card>
        <Card>
          <h2>redux基础用例</h2>
          <Provider store={store}>
            <ReduxIndex></ReduxIndex>
          </Provider>
        </Card>
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

export default Example;
