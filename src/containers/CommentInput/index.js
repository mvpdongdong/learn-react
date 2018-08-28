import React, { Component } from 'react';
import CommentInput from '~/components/CommentInput';
import message from '~/components/Message';
import { connect } from 'react-redux';
import { addComment } from '~/store/actions/comment';

class CommentInputContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userName: localStorage.getItem('userName') || ''
    };
  }

  handleUserNameBlur = (userName) => {
    localStorage.setItem('userName', userName);
  }

  handleSubmit = (comment) => {
    if (!comment) return;
    if (!comment.userName) {
      message.warning('请输入姓名');
      return;
    }
    if (!comment.content) {
      message.warning('请输入评论内容');
      return;
    };
    const { comments } = this.props;
    const commentList = [...comments, comment];
    localStorage.setItem('comments', JSON.stringify(commentList));
    if (this.props.onSubmit) {
      this.props.onSubmit(comment);
    }
  }

  render () {
    return (
      <CommentInput
        userName={this.state.userName}
        onUserNameBlur={this.handleUserNameBlur}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer);
