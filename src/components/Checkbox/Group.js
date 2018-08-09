import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import checkboxContext from './context';
import Checkbox from './Checkbox';

class CheckboxGroup extends Component {
  static propTypes = {
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    options: PropTypes.array
  }

  constructor (props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
    };
  }

  componentWillReceiveProps (nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  toggleOption = (option) => {
    const optionIndex = this.state.value.indexOf(option.value);
    const value = [...this.state.value];
    if (optionIndex === - 1) {
      value.push(option.value);
    } else {
      value.splice(optionIndex, 1);
    }
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value);
    }
  }

  render () {
    const context = {
      checkboxGroup: {
        value: this.state.value,
        name: this.props.name,
        onChange: this.toggleOption,
        disabled: this.props.disabled
      }
    };
    let children;
    const { options } = this.props;
    if (options) {
      children = options.map(option => {
        const { label, ...restOption } = option;
        return <Checkbox key={restOption.value} {...restOption}>{label ? label : restOption.value}</Checkbox>;
      });
    }
    return (
      <div className="checkbox-group">
        <checkboxContext.Provider value={context}>
          <React.Fragment>
            {children ? children : this.props.children}
          </React.Fragment>
        </checkboxContext.Provider>
      </div>
    );
  }
}

export default CheckboxGroup;
