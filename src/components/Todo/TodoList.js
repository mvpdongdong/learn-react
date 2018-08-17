import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {
        todos.map(todo => {
          return <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)}/>;
        })
      }
    </ul>
  );
};

export default TodoList;
