import React from 'react';
import './NextButton.css';

const NextButton = ({ onClick, disabled }) => {
    return (
      <div className="next-button" onClick={onClick} disabled={disabled}>
        <i class="fas fa-chevron-right"></i>
      </div>
    );
};

export default NextButton;
