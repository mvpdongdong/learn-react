import './index.scss';
import React from 'react';

const Card = (props) => {
  return (
    <div className="module-card">
      {props.children}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;

