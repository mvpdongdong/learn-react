import './index.scss';
import React from 'react';

export default function (props) {
  return (
    <div className="module-card">
      {props.children}
    </div>
  );
}

