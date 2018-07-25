import React from 'react';

const FancyButton = React.forwardRef((props, ref) => {
  return (
    <button ref={ref} {...props} className="FancyButton"></button>
  );
});

export default FancyButton;
