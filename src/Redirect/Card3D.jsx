// Card3D.jsx
import React from 'react';
import './Card3D.css';

const Card3D = ({ stepTitle, children }) => {
  return (
    <div className="card-3d">
      <h3>{stepTitle}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card3D;
