import { LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE } from '~/actions/callApi';
const apiReducer = (state = {}, action) => {
  switch (action.type) {
  case LOAD_POSTS_REQUEST:
    return {
      ...state,
      [action.postType]: {
        items: [],
        isFetching: true
      }
    };
  case LOAD_POSTS_SUCCESS:
    return {
      ...state,
      [action.postType]: {
        items: action.response,
        isFetching: false
      }
    };
  case LOAD_POSTS_FAILURE:
    return {
      ...state,
      [action.postType]: {
        isFetching: false,
        error: action.error
      }
    };
  default:
    return state;
  }
};

export default apiReducer;
