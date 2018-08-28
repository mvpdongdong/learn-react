import undoable, { distinctState } from 'redux-undo';

const todosReducer = (state = initTodos(), action) => {
  let todos;
  switch (action.type) {
    case 'ADD_TODO':
      todos = addTodo(state, action);
      storeTodos(todos);
      return todos;
    case 'DELETE_TODO':
      todos = deleteTodo(state, action);
      storeTodos(todos);
      return todos;
    case 'TOGGLE_TODO':
      todos = toggleTodo(state, action);
      storeTodos(todos);
      return todos;
    default:
      return state;
  }
};

function storeTodos (todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function initTodos () {
  let todos = localStorage.getItem('todos');
  todos = todos ? JSON.parse(todos) : [];
  return todos;
}

function addTodo (state, action) {
  return [
    ...state,
    {
      id: action.id,
      text: action.text,
      completed: false
    }
  ];
}

function toggleTodo (state, action) {
  return state.map(todo => (
    (todo.id === action.id)
      ? { ...todo, completed: !todo.completed }
      : todo
  ));
}

function deleteTodo (state, action) {
  return state.filter(todo => (
    todo.id !== action.id
  ));
}

export default undoable(todosReducer, {
  filter: distinctState()
});
