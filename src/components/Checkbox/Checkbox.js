import React, { Component } from 'react';
import shallowEqual from 'shallowequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Group from './Group';
import checkboxContext from './context';
import './checkbox.scss';

class Checkbox extends Component {
  static propTypes = {
    value: PropTypes.any,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func
  }

  static defaultProps = {
    defaultChecked: false,
    onChange: function () {}
  }

  static Group = Group;

  constructor (props) {
    super(props);
    this.checkboxProps = null;
    const checked = 'checked' in props ? props.checked : props.defaultChecked;
    this.state = {
      checked
    };
  }

  componentWillReceiveProps (nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked
      });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  handleChange = (ev) => {
    if (!this.checkboxProps) return;
    const { onChange } = this.checkboxProps;
    if (!('checked' in this.props)) {
      this.setState({
        checked: ev.target.checked
      });
    }
    if (typeof onChange === 'function') {
      onChange({
        ...this.checkboxProps
      });
    }
  }

  render () {
    return (
      <checkboxContext.Consumer>
        {
          ({ checkboxGroup }) => {
            const { ...checkboxProps } = this.props;
            checkboxProps.checked = this.state.checked;
            if (checkboxGroup) {
              checkboxProps.onChange = checkboxGroup.onChange;
              checkboxProps.checked = checkboxGroup.value.indexOf(this.props.value) !== - 1;
              checkboxProps.disabled = checkboxGroup.disabled || checkboxProps.disabled;
              checkboxProps.name = checkboxGroup.name;
            }
            this.checkboxProps = checkboxProps;
            const classString = classNames('sd-checkbox', {
              'sd-checkbox-checked': checkboxProps.checked,
              'sd-checkbox-disabled': checkboxProps.disabled
            });
            return (
              <label className="sd-checkbox-wrapper">
                <span className={classString}>
                  <input
                    className="sd-checkbox__input"
                    type="checkbox"
                    checked={checkboxProps.checked}
                    disabled={checkboxProps.disabled}
                    value={checkboxProps.value}
                    onChange={this.handleChange}
                  />
                  <span className="sd-checkbox__inner"></span>
                </span>
                <span>
                  {checkboxProps.children}
                </span>
              </label>
            );
          }
        }
      </checkboxContext.Consumer>
    );
  }
}

export default Checkbox;
