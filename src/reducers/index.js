import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import comment from './comment';
import theme from './theme';
import api from './api';

export default combineReducers({
  todos,
  visibilityFilter,
  comments: comment,
  themeColor: theme,
  posts: api
});
