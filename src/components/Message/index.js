import './index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Message extends Component {
  static propTypes = {
    type: PropTypes.string,
    duration: PropTypes.number,
    onClose: PropTypes.func,
    message: PropTypes.string,
    update: PropTypes.bool,
    showClose: PropTypes.bool
  }

  static defaultProps = {
    type: 'info',
    style: {},
    onClose () {},
    duration: 3
  }

  componentDidMount () {
    this.startCloseTimer();
  }

  componentDidUpdate (prevProps) {
    if (this.props.duration !== prevProps.duration || this.props.update) {
      this.restartCloseTimer();
    }
  }

  componentWillUnmount () {
    this.clearCloseTimer();
  }

  close () {
    this.clearCloseTimer();
    this.props.onClose();
    this.props.destroy();
  }

  startCloseTimer = () => {
    if (this.props.duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, this.props.duration * 1000);
    }
  }

  clearCloseTimer = () => {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  restartCloseTimer () {
    this.clearCloseTimer();
    this.startCloseTimer();
  }

  render () {
    const { type, style, message, showClose } = this.props;
    const classes = [
      'module-message',
      type ? `module-message-${type}` : ''
    ];
    return (
      <div
        className={classes.join(' ')}
        style={style}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
      >
        <p className="module-message__content">
          {message}
        </p>
        {showClose && <i className="module-message__closeBtn" onClick={this.close.bind(this)}>x</i>}
      </div>
    );
  }
}

function message (props) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const destroy = (div) => {
    return () => {
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    };
  };
  ReactDOM.render(<Message destroy={destroy(div)} {...props}/>, div);
}

export default message;
