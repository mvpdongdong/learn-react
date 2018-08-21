let initTodos = localStorage.getItem('todos');
initTodos = initTodos ? JSON.parse(initTodos) : [];
const todosReducer = (state = initTodos, action) => {
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
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos;
  case 'DELETE_TODO':
    todos = state.filter(todo => (
      todo.id !== action.id
    ));
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos;
  case 'TOGGLE_TODO':
    todos = state.map(todo => (
      (todo.id === action.id)
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos;
  default:
    return state;
  }
};

export default todosReducer;
