import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ItineraryPage.css';
import DaySelector from '../components/DaySelector';
import DayDetails from '../components/DayDetails';
import Timeline from '../components/Timeline';

function ItineraryPage() {
  const location = useLocation();
  const itineraryData = location.state?.itinerary || [];
  console.log("Itinerary page state", location.state)

  const [selectedDay, setSelectedDay] = useState(itineraryData.length > 0 ? itineraryData[0].day : 1);

  console.log("Selected day", selectedDay)
  console.log(itineraryData)
  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const selectedDayData = itineraryData.find(day => day.day === selectedDay);

  if (!selectedDayData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ItineraryPage">
      <header>
        <h1>Your itinerary</h1>
        <DaySelector days={itineraryData} selectedDay={selectedDay} onDayChange={handleDayChange} />
      </header>
      <div className="content-container">
        <div className="content">
          <DayDetails title={selectedDayData.title} description={selectedDayData.description} />
          <Timeline activities={selectedDayData.blocks} />
        </div>
      </div>
    </div>
  );
}

export default ItineraryPage;

