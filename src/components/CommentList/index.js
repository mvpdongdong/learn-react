import React, { Component } from 'react';
import Comment from '~/components/Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

  handleDeleteComment = (index) => {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  render () {
    return (
      <div className="comment-list">
        {
          this.props.comments.map((comment, index) => (
            <Comment onDeleteComment={this.handleDeleteComment} key={comment.createTime} comment={comment} index={index}/>
          ))
        }
      </div>
    );
  }
}

export default CommentList;
