import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { toggleTodo, deleteTodo } from '~/store/actions/todo';
import TodoList from '~/components/Todo/TodoList';

const getVisibilityFilter = state => state.visibilityFilter;
const getTodos = state => state.todos.present;

const getVisibleTodos = createSelector(
  [getTodos, getVisibilityFilter],
  (todos, filter) => {
    switch (filter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(todo => (todo.completed));
      case 'SHOW_ACTIVE':
        return todos.filter(todo => (!todo.completed));
      default:
        return todos;
    }
  }
);

const mapStateToProps = state => ({
  todos: getVisibleTodos(state)
});

// const mapDispatchToProps = dispatch => ({
//   toggleTodo: id => dispatch(toggleTodo(id)),
//   deleteTodo: id => dispatch(deleteTodo(id))
// });

const mapDispatchToProps = {
  toggleTodo,
  deleteTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
