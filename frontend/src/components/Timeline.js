import React from 'react';
import './Timeline.css';

function Timeline({ activities }) {
  return (
    <div className="timeline-container">
      <div className="timeline">
        <div className="line"></div>
        {activities.map((activity, index) => (
          <div key={index} className="activity">
            <div className="dot"></div>
            <div className="activity-card">
              <div className="details">
                <div className="title">{activity.title}</div>
                <div className="timeOfDay">{activity.timeOfDay}</div>
                <div className="description">{activity.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
