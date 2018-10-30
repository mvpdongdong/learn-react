import React, { Component } from 'react';
import classNames from 'classnames';
import radioContext from './context';
import Group from './Group';
import './radio.scss';

class Radio extends Component {
  static Group = Group;

  radioProps = null

  handleChange = (ev) => {
    if (!this.radioProps) return;
    const { onChange } = this.radioProps;
    if (typeof onChange === 'function') {
      onChange({
        target: {
          ...this.radioProps,
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
  }

  render () {
    return (
      <radioContext.Consumer>
        {
          ({ radioGroup }) => {
            const { ...radioProps } = this.props;
            this.radioProps = radioProps;
            if (radioGroup) {
              radioProps.checked = radioGroup.value === radioProps.value;
              radioProps.name = radioGroup.name;
              radioProps.onChange = radioGroup.onChange;
              radioProps.disabled = radioGroup.disabled || radioProps.disabled;
            }
            const classString = classNames({
              'sd-radio__checked': radioProps.checked,
              'sd-radio__disabled': radioProps.disabled
            }, 'sd-radio');
            return (
              <label className="sd-radio-wrapper">
                <span
                  className={classString}>
                  <input
                    className="sd-radio__input"
                    type="radio"
                    checked={radioProps.checked}
                    disabled={radioProps.disabled}
                    onChange={this.handleChange}
                    value={radioProps.value}
                  />
                  <span className="sd-radio__inner"></span>
                </span>
                <span>{radioProps.children}</span>
              </label>
            );
          }
        }
      </radioContext.Consumer>
    );
  }
}

export default Radio;
