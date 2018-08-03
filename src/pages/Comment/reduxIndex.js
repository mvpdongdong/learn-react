import React, { Component } from 'react';
import './index.scss';
import CommentInput from '~/components/CommentInput/container';
import CommentList from '~/components/CommentList/container';
import commentReducer from '~/reducers/commentReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(commentReducer);
class Comment extends Component {
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
