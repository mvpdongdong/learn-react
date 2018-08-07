import React, { Component } from 'react';
import classNames from 'classnames';
import radioContext from './context';
import Group from './Group';
import './radio.scss';

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
    const classString = classNames({
      'sd-radio__checked': radioProps.checked
    }, 'sd-radio');
    this.props = radioProps;
    return (
      <label className="sd-radio-wrapper">
        <span
          className={classString}>
          <input
            className="sd-radio__input"
            type="radio"
            checked={this.props.checked}
            disabled={this.props.disabled}
            onChange={this.handleChange}
            value={this.props.value}
          />
          <span className="sd-radio__inner">

          </span>
        </span>
        <span>{this.props.children}</span>
      </label>
    );
  }
}

export default RadioContainer;
