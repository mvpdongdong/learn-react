import React, { Component } from 'react';
import shallowEqual from 'shallowequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Group from './Group';
import checkboxContext from './context';
import './checkbox.scss';

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

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
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
    const classString = classNames('sd-checkbox', {
      'sd-checkbox-checked': this.props.checked,
      'sd-checkbox-disabled': this.props.disabled
    });
    return (
      <label className="sd-checkbox-wrapper">
        <span className={classString}>
          <input
            className="sd-checkbox__input"
            type="checkbox"
            checked={this.props.checked}
            disabled={this.props.disabled}
            value={this.props.value}
            onChange={this.handleChange}
          />
          <span className="sd-checkbox__inner"></span>
        </span>
        <span>
          {this.props.children}
        </span>
      </label>
    );
  }
}

export default CheckboxContainer;
