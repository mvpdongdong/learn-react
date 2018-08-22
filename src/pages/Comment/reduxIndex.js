import React, { Component } from 'react';
import './index.scss';
import CommentInput from '~/components/CommentInput/container';
import CommentList from '~/components/CommentList/container';

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
