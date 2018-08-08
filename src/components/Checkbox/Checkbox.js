import React, { Component } from 'react';
import Group from './Group';
import PropTypes from 'prop-types';
import checkboxContext from './context';

class CheckboxContainer extends Component {
  static Group = Group;

  render () {
    return (
      <checkboxContext.Consumer>
        {
          ({ checkboxGroup }) => (<Checkbox {...this.props} checkboxGroup={checkboxGroup}></Checkbox>)
        }
      </checkboxContext.Consumer>
    );
  }
}

class Checkbox extends Component {
  static propTypes = {
    value: PropTypes.any,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  }

  handleChange = (ev) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange({
        ...this.props
      });
    }
  }

  render () {
    const { checkboxGroup, ...checkboxProps } = this.props;
    if (checkboxGroup) {
      checkboxProps.onChange = checkboxGroup.onChange;
      checkboxProps.checked = checkboxGroup.value.indexOf(this.props.value) !== - 1;
      checkboxProps.disabled = checkboxGroup.disabled || checkboxProps.disabled;
      checkboxProps.name = checkboxGroup.name;
    }
    this.props = checkboxProps;
    return (
      <label>
        <input
          type="checkbox"
          checked={this.props.checked}
          disabled={this.props.disabled}
          value={this.props.value}
          onChange={this.handleChange}
        />
        {this.props.children}
      </label>
    );
  }
}

export default CheckboxContainer;
