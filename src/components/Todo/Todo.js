import React from 'react';
import './Todo.scss';
const Todo = ({ onClick, onDelete, completed, text }) => {
  return (
    <li className="todo">
      <span
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
        onClick={onClick}
      >
        {text}
      </span>
      <span className="delete-todo" onClick={onDelete}>删除</span>
    </li>
  );
};

export default Todo;
