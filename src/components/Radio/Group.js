import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import radioContext from './context';
import Radio from './Radio';

const getCheckedValue = children => {
  let value;
  React.Children.forEach(children, item => {
    if (item && item.props && item.props.checked) {
      value = item.props.value;
    }
  });
  return value;
};

class Group extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    options: PropTypes.array
  };

  static defaultProps = {
    disabled: false
  };

  constructor (props) {
    super(props);
    let value;
    if ('value' in this.props) {
      value = this.props.value;
    } else if ('defaultValue' in this.props) {
      value = this.props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue;
    }
    this.state = {
      value
    };
  }

  componentWillReceiveProps (nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value
      });
    } else {
      const checkedValue = getCheckedValue(nextProps.children);
      if (checkedValue) {
        this.setState({
          value: checkedValue,
        });
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  onRadioChange = (ev) => {
    const lastValue = this.state.value;
    const value = ev.target.value;
    if (!('value' in this.props)) {
      this.setState({
        value
      });
    }
    const { onChange } = this.props;
    if (onChange && typeof onChange === 'function' && value !== lastValue) {
      onChange(ev);
    }
  }

  render () {
    const context = {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: this.props.disabled,
        name: this.props.name,
      },
    };
    let children;
    let { options } = this.props;
    if (options) {
      children = options.map(option => {
        const { label, ...restOption } = option;
        return <Radio key={restOption.value} {...restOption}>{label ? label : restOption.value}</Radio>;
      });
    }
    return (
      <div className="radio-group">
        <radioContext.Provider value={context}>
          <React.Fragment>
            {children ? children : this.props.children}
          </React.Fragment>
        </radioContext.Provider>
      </div>
    );
  }
}

export default Group;
