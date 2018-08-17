import React from 'react';
import './Todo.scss';
const Todo = ({ onClick, completed, text }) => {
  return (
    <li className="todo"
      onClick={onClick}
      style={{ textDecoration: completed ? 'line-through' : 'none' }}
    >
      {text}
    </li>
  );
};

export default Todo;
