import React, { Component } from 'react';
import CommentList from './index';
import { connect } from 'react-redux';
import { initComments, deleteComment } from '~/actions/comment';

class CommentListContainer extends Component {
  constructor (props) {
    super(props);
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    this.props.initComments(comments);
  }

  componentWillReceiveProps (nextProps) {
    localStorage.setItem('comments', JSON.stringify(nextProps.comments));
  }

  handleDeleteComment = (index) => {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index);
    }
  }

  render () {
    return (
      <CommentList comments={this.props.comments} onDeleteComment={this.handleDeleteComment}/>
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
    initComments: (comments) => {
      dispatch(initComments(comments));
    },
    onDeleteComment: (index) => {
      dispatch(deleteComment(index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);
