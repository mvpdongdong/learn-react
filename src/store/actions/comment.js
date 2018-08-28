// action types
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// action creators
export const initComments = (comments) => {
  return { type: INIT_COMMENTS, comments };
};

export const addComment = (comment) => {
  return { type: ADD_COMMENT, comment };
};

export const deleteComment = (commentIndex) => {
  return { type: DELETE_COMMENT, commentIndex };
};
