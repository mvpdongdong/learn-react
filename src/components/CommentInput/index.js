import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class CommentInput extends Component {
  static propsType = {
    userName: PropTypes.string,
    onUserNameBlur: PropTypes.func,
    onSubmit: PropTypes.func
  }

  constructor (props) {
    super(props);
    this.state = {
      userName: this.props.userName || '',
      content: ''
    };
  }

  componentDidMount () {
    if (!this.state.userName) {
      this.input.focus();
      return;
    }
    this.textarea.focus();
  }

  handleUserNameChange = (event) => {
    this.setState({
      userName: event.target.value
    });
  }

  handleUserNameBlur = (event) => {
    if (this.props.onUserNameBlur) {
      this.props.onUserNameBlur(event.target.value);
    }
  }

  handleCommentChange = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  handleSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(
        {
          ...this.state,
          createTime: + new Date()
        }
      );
    }
    this.setState({
      content: ''
    });
  }

  render () {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input ref={input => (this.input = input)} onBlur={this.handleUserNameBlur} onChange={this.handleUserNameChange} value={this.state.userName}/>
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea ref={textarea => (this.textarea = textarea)} onChange={this.handleCommentChange} value={this.state.content}/>
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit}>发布</button>
        </div>
      </div>
    );
  }
}

export default CommentInput;
