import React, { Component } from 'react';
import './index.scss';
import CommentInput from '~/components/CommentInput';
import CommentList from '~/components/CommentList';
import message from '~/components/Message';

class Comment extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userName: localStorage.getItem('userName') || '',
      commentList: JSON.parse(localStorage.getItem('commentList')) || []
    };
  }

  handleDeleteComment = (index) => {
    const beforeCommentList = this.state.commentList.slice(0, index);
    const afterCommentList = this.state.commentList.slice(index + 1);
    const commentList = [...beforeCommentList, ...afterCommentList];
    localStorage.setItem('commentList', JSON.stringify(commentList));
    this.setState({
      commentList
    });
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
    comment.createTime = + new Date();
    const commentList = [...this.state.commentList, comment];
    localStorage.setItem('commentList', JSON.stringify(commentList));
    this.setState({
      commentList
    });
  }

  handleUserNameBlur = (userName) => {
    localStorage.setItem('userName', userName);
  }

  render () {
    return (
      <div className="comment-wrapper">
        <CommentInput userName={this.state.userName} onSubmit={this.handleSubmit} onUserNameBlur={this.handleUserNameBlur}/>
        <CommentList onDeleteComment={this.handleDeleteComment} comments={this.state.commentList}/>
      </div>
    );
  }
}

export default Comment;
