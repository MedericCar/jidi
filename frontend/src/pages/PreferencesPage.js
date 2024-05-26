import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserChoicesContext } from '../components/UserChoicesProvider';
import './PreferencesPage.css';
import NextButton from '../components/NextButton';
import SpinnerComponent from '../components/SpinnerComponent';
import TripImage from '../assets/choices.png';


const preferences = [
  "Historic Landmarks",
  "Museums and Galleries",
  "Food and Gastronomy",
  "Fashion and Shopping",
  "Parks and Gardens",
  "Nightlife",
  "Live Music",
  "Sports and Outdoors",
  "Street Art",
  "Local Events",
  "Markets",
  "Workshops",
  "Hidden Gems",
  "Relaxation",
  "Tours",
  "Architecture",
  "Antique Hunting"
];

const PreferencesPage = () => {
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [travelCompanion, setTravelCompanion] = useState('');
  const [stayDuration, setStayDuration] = useState(1);
  const { userChoices, setUserChoices } = useContext(UserChoicesContext);
  const navigate = useNavigate();

  const handlePreferenceClick = (preference) => {
    setSelectedPreferences((prev) =>
      prev.includes(preference)
        ? prev.filter((item) => item !== preference)
        : [...prev, preference]
    );
  };

  const handleNextClick = () => {
    console.log(userChoices);
    const leftOutCategories = preferences.filter(value => !selectedPreferences.includes(value))
    setUserChoices({...userChoices, "preferredCategories": selectedPreferences, "leftOutCategories": leftOutCategories, "type": travelCompanion, "durationInDays": stayDuration})
    console.log(userChoices)
    navigate('/questions', { state: { selectedPreferences, travelCompanion, stayDuration } });
  };

  if (loading) {
    return <SpinnerComponent message="Just a few more questions to finalize your perfect trip!" />;
  }

  return (
    <div className="preferences-page">
      <div className="preferences-container">
        <h2>What's your style?</h2>
        <div className="preferences-grid">
          {preferences.map((preference) => (
            <div
              key={preference}
              className={`preference-box ${
                selectedPreferences.includes(preference) ? 'selected' : ''
              }`}
              onClick={() => handlePreferenceClick(preference)}
            >
              <p>{preference}</p>
            </div>
          ))}
        </div>
        <div className="travel-companion">
          <h2>Who are you traveling with?</h2>
          <div className="options">
            {['Solo', 'Family', 'Friends', 'Couple'].map(option => (
              <button
                key={option}
                className={`option-button ${travelCompanion === option ? 'selected' : ''}`}
                onClick={() => setTravelCompanion(option)}
              >
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="stay-duration">
          <h2>How long do you intend to stay?</h2>
          <input
            type="range"
            min="1"
            max="4"
            value={stayDuration}
            onChange={(e) => setStayDuration(e.target.value)}
            className="slider"
          />
          <div className="slider-labels">
            <span>1 day</span>
            <span>2 days</span>
            <span>3 days</span>
            <span>4 days</span>
          </div>
        </div>
        <div className="next-button-container">
          <NextButton onClick={handleNextClick} disabled={selectedPreferences.length === 0} />
        </div>
      </div>
      <div className="image-container">
        <img style={{height:"470px"}} src={TripImage} alt="Descriptive Alt Text" />
      </div>
    </div>
  );
};

export default PreferencesPage;
