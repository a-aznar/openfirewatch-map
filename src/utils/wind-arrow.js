import React from 'react';
import './wind-arrow.css'
const WindArrow = ({ direction }) => {
  const arrowStyle = {
    transform: `rotate(${direction}deg)`,
  };

  return (
    <div className="wind-arrow" style={arrowStyle}>
      <div className="arrow-barb"></div>
      <div className="arrow-body"></div>
    </div>
  );
};

export default WindArrow;