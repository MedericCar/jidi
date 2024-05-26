import React from 'react';
import './DaySelector.css';

function DaySelector({ days, selectedDay, onDayChange }) {
  return (
    <div className="day-selector">
      {days.map(day => (
        <button
          key={day.day}
          className={`day-button ${selectedDay === day.day ? 'selected' : ''}`}
          onClick={() => onDayChange(day.day)}
        >
          <span>{`Day ${day.day}`}</span>
        </button>
      ))}
    </div>
  );
}

export default DaySelector;
