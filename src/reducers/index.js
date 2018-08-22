import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import comment from './comment';
import theme from './theme';

export default combineReducers({
  todos,
  visibilityFilter,
  comments: comment,
  themeColor: theme
});
