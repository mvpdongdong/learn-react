import './index.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Message extends Component {
  constructor (props) {
    super(props);
    this.ref = React.createRef();
  }

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
    this.ref.current.removeEventListener('transitionend', this.props.destroy);
  }

  close = () => {
    this.transitionEnd();
    this.ref.current.addEventListener('transitionend', this.props.destroy);
    this.clearCloseTimer();
    this.props.onClose();
  }

  transitionStart = () => {
    setTimeout(() => {
      this.ref.current.classList.remove('message-fade-enter');
    }, 0);
  }

  transitionEnd = () => {
    this.ref.current.classList.add('message-fade-leave-to');
  }

  startCloseTimer = () => {
    this.transitionStart();
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
      'message-fade-enter',
      type ? `module-message-${type}` : ''
    ];
    return (
      <div
        ref={this.ref}
        className={classes.join(' ')}
        style={style}
        onMouseEnter={this.clearCloseTimer}
        onMouseLeave={this.startCloseTimer}
      >
        <p className="module-message__content">
          {message}
        </p>
        {showClose && <i className="module-message__closeBtn" onClick={this.close}>x</i>}
      </div>
    );
  }
}

let zIndex = 1000;

function message (props) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const destroy = (div) => {
    return () => {
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    };
  };
  ReactDOM.render(<Message style={{ zIndex: zIndex ++ }} destroy={destroy(div)} {...props}/>, div);
}

['success', 'warning', 'error', 'info'].forEach(type => {
  message[type] = function (props) {
    if (typeof props === 'string') {
      props = {
        message: props
      };
    }
    props.type = type;
    message(props);
  };
});

export default message;
