const todosReducer = (state = initTodos(), action) => {
  let todos;
  switch (action.type) {
  case 'ADD_TODO':
    todos = [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false
      }
    ];
    storeTodos(todos);
    return todos;
  case 'DELETE_TODO':
    todos = state.filter(todo => (
      todo.id !== action.id
    ));
    storeTodos(todos);
    return todos;
  case 'TOGGLE_TODO':
    todos = state.map(todo => (
      (todo.id === action.id)
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
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

export default todosReducer;
