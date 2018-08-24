import React, { Component } from 'react';
import './index.scss';
import CommentInput from '~/containers/CommentInput';
import CommentList from '~/containers/CommentList';

class Comment extends Component {
  render () {
    return (
      <div className="comment-wrapper">
        <React.Fragment>
          <CommentInput/>
          <CommentList/>
        </React.Fragment>
      </div>
    );
  }
}

export default Comment;
