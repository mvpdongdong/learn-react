import produce from 'immer';

// action types
const INIT_COMMENTS = 'INIT_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// reducer
export default (state = [], action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT_COMMENTS:
        // 初始化评论
        return action.comments;
      case ADD_COMMENT:
        // 新增评论
        draft.push(action.comment);
        break;
      case DELETE_COMMENT:
        // 删除评论
        draft.splice(action.commentIndex, 1);
        break;
      default:
    }
  });
