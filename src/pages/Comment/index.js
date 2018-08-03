import React, { Component } from 'react';
import './index.scss';
import CommentInput from '~/components/CommentInput/container';
import CommentList from '~/components/CommentList/container';
import commentReducer from '~/reducers/commentReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import message from '~/components/Message';

const store = createStore(commentReducer);
class Comment extends Component {
  // constructor (props) {
  //   super(props);
  //   this.state = {
  //     userName: localStorage.getItem('userName') || '',
  //     commentList: JSON.parse(localStorage.getItem('commentList')) || []
  //   };
  // }

  // handleDeleteComment = (index) => {
  //   const beforeCommentList = this.state.commentList.slice(0, index);
  //   const afterCommentList = this.state.commentList.slice(index + 1);
  //   const commentList = [...beforeCommentList, ...afterCommentList];
  //   localStorage.setItem('commentList', JSON.stringify(commentList));
  //   this.setState({
  //     commentList
  //   });
  // }

  // handleSubmit = (comment) => {
  //   if (!comment) return;
  //   if (!comment.userName) {
  //     message.warning('请输入姓名');
  //     return;
  //   }
  //   if (!comment.content) {
  //     message.warning('请输入评论内容');
  //     return;
  //   };
  //   const commentList = [...this.state.commentList, comment];
  //   localStorage.setItem('commentList', JSON.stringify(commentList));
  //   this.setState({
  //     commentList
  //   });
  // }

  // handleUserNameBlur = (userName) => {
  //   localStorage.setItem('userName', userName);
  // }

  render () {
    return (
      <div className="comment-wrapper">
        <Provider store={store}>
          <React.Fragment>
            <CommentInput/>
            <CommentList/>
          </React.Fragment>
        </Provider>
      </div>
    );
  }
}

export default Comment;
