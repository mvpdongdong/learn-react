// action types
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// reducer
export default function (state, action) {
  if (!state) {
    state = [];
  }
  switch (action.type) {
    case INIT_COMMENTS:
    // 初始化评论
      return action.comments;
    case ADD_COMMENT:
    // 新增评论
      return [...state, action.comment];
    case DELETE_COMMENT:
    // 删除评论
      return [
        ...state.slice(0, action.commentIndex),
        ...state.slice(action.commentIndex + 1)
      ];
    default:
      return state;
  }
}
