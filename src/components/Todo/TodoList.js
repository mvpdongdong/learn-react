import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <ul>
      {
        todos.map(todo => {
          return <Todo key={todo.id} {...todo} onDelete={() => deleteTodo(todo.id)} onClick={() => toggleTodo(todo.id)}/>;
        })
      }
    </ul>
  );
};

export default TodoList;
