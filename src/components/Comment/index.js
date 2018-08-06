import React, { Component } from 'react';
import './index.scss';
import { formatTime } from '~/utils';

class Comment extends Component {
  constructor (props) {
    super(props);
    this.state = {
      timeString: ''
    };
  }

  componentDidMount () {
    this._updateTimeString();
    this.timer = setInterval(() => {
      this._updateTimeString();
    }, 5000);
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  _updateTimeString () {
    const duration = formatTime(this.props.comment.createTime);
    this.setState({
      timeString: duration
    });
  }

  handleDeleteComment = () => {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  _getProcessedContent (content) {
    return content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
  }

  render () {
    const comment = this.props.comment;
    return (
      <div className='comment'>
        <div className='comment-user'>
          <span className='comment-username'>
            {comment.userName}
          </span>：
        </div>
        <p dangerouslySetInnerHTML={{
          __html: this._getProcessedContent(comment.content)
        }} />
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span
          onClick={this.handleDeleteComment}
          className='comment-delete'>
          删除
        </span>
      </div>
    );
  }
}

export default Comment;
