import React from 'react';

const Link = ({ active, children, onClick }) => {
  return (
    <button
      disabled={active}
      onClick={onClick}
      style={{
        marginLeft: '4px',
      }}
    >
      {children}
    </button>
  );
};

export default Link;
