import React, { Component } from 'react';
import radioContext from './context';

class RadioContainer extends Component {
  render () {
    return (
      <radioContext.Consumer>
        {
          ({ radioGroup }) => (
            <Radio {...this.props} radioGroup={radioGroup}></Radio>
          )
        }
      </radioContext.Consumer>
    );
  }
}

class Radio extends Component {
  constructor (props) {
    super(props);
    const radioGroup = this.props.radioGroup;
    const checked = radioGroup.value === this.props.value;
    this.state = {
      checked
    };
  }

  componentWillReceiveProps (nextProps) {
    const radioGroup = nextProps.radioGroup;
    const checked = radioGroup.value === this.props.value;
    console.log('1111',this.props.value);
    console.log('1112',radioGroup.value);
    console.log('1114', checked);
    this.setState({
      checked
    });
  }

  handleChange = (ev) => {
    const { props } = this;
    if (!('checked' in props)) {
      this.setState({
        checked: ev.target.checked,
      });
    }
    this.props.radioGroup.onChange(ev);
  }

  render () {
    return (
      <label>
        <input checked={this.state.checked} onChange={this.handleChange} type="radio" value={this.props.value}/>
        {this.props.children}
      </label>
    );
  }
}

export default RadioContainer;
