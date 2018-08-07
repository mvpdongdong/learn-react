import React, { Component } from 'react';
import radioContext from './context';
import Group from './Group';

class RadioContainer extends Component {
  static Group = Group;
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
  handleChange = (ev) => {
    const { props } = this;
    if (typeof props.onChange !== 'function') return;
    props.onChange({
      target: {
        ...this.props,
        checked: ev.target.checked,
      },
      stopPropagation () {
        ev.stopPropagation();
      },
      preventDefault () {
        ev.preventDefault();
      },
      nativeEvent: ev.nativeEvent,
    });
  }

  render () {
    const { radioGroup, ...radioProps } = this.props;
    if (radioGroup) {
      radioProps.checked = radioGroup.value === radioProps.value;
      radioProps.name = radioGroup.name;
      radioProps.onChange = radioGroup.onChange;
      radioProps.disabled = radioGroup.disabled || radioProps.disabled;
    }
    this.props = radioProps;
    return (
      <label>
        <input
          type="radio"
          checked={this.props.checked}
          disabled={this.props.disabled}
          onChange={this.handleChange}
          value={this.props.value}
        />
        {this.props.children}
      </label>
    );
  }
}

export default RadioContainer;
