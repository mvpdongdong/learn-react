import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import radioContext from './context';
import Group from './Group';
import './radio.scss';

class Radio extends Component {
  static propTypes = {
    value: PropTypes.any,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    style: {},
    defaultChecked: false,
    onFocus () {},
    onBlur () {},
    onChange () {},
  };

  static Group = Group;

  constructor (props) {
    super(props);
    this.radioProps = null;
    const checked = 'checked' in props ? props.checked : props.defaultChecked;
    this.state = {
      checked
    };
  }

  componentWillReceiveProps (nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      });
    }
  }

  handleChange = (ev) => {
    if (!this.radioProps) return;
    const { onChange } = this.radioProps;
    if (!('checked' in this.props)) {
      this.setState({
        checked: ev.target.checked
      });
    }
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

  focus () {
    this.input.focus();
  }

  blur () {
    this.input.blur();
  }

  saveInput = (node) => {
    this.input = node;
  }

  render () {
    return (
      <radioContext.Consumer>
        {
          ({ radioGroup }) => {
            const { ...radioProps } = this.props;
            radioProps.checked = this.state.checked;
            if (radioGroup) {
              radioProps.checked = radioGroup.value === radioProps.value;
              radioProps.name = radioGroup.name;
              radioProps.onChange = radioGroup.onChange;
              radioProps.disabled = radioGroup.disabled || radioProps.disabled;
            }
            this.radioProps = radioProps;
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
                    onFocus={radioProps.onFocus}
                    onBlur={radioProps.onBlur}
                    value={radioProps.value}
                    ref={this.saveInput}
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
