import React from 'react';
import './DayDetails.css';

function DayDetails({ title, description }) {
  return (
    <div className="day-details">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default DayDetails;
