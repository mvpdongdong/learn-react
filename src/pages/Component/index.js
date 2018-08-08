import React, { Component } from 'react';
import Card from '~/components/Card';
import message from '~/components/Message';
import Radio from '~/components/Radio/Radio';
import Checkbox from '~/components/Checkbox/Checkbox';

const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
class ComponentPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      radio: 2,
      checkbox: [2]
    };
  }

  handleClick = () => {
    message.success('hello');
  }

  handleRadioChange = (ev) => {
    this.setState({
      radio: ev.target.value
    });
  }

  handleCheckboxChange = (value) => {
    console.log('checkbox', value);
    this.setState({
      checkbox: value
    });
  }

  render () {
    return (
      <div>
        <Card>
          <h2>message组件</h2>
          <button onClick={this.handleClick}>点击</button>
        </Card>
        <Card>
          <h2>单选框组件</h2>
          <RadioGroup onChange={this.handleRadioChange} value={this.state.radio}>
            <Radio disabled value={1}>hello</Radio>
            <Radio disabled value={2}>shen</Radio>
          </RadioGroup>
        </Card>
        <Card>
          <h2>复选框组件</h2>
          <CheckboxGroup onChange={this.handleCheckboxChange} value={this.state.checkbox}>
            <Checkbox value={1}>hello</Checkbox>
            <Checkbox value={2}>shen</Checkbox>
          </CheckboxGroup>
        </Card>
      </div>
    );
  }
}

export default ComponentPage;
