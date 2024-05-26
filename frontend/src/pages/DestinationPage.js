import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserChoicesContext } from '../components/UserChoicesProvider';
import NextButton from '../components/NextButton';

import ParisIcon from '../assets/paris.png';
import LondonIcon from '../assets/london.png';
import SanFranciscoIcon from '../assets/sf.png';

import '../App.css'
import './HomePage.css';
import './DestinationPage.css';

const cities = [
  { id: 1, img: ParisIcon, name: 'Paris', country: 'France' },
  { id: 2, img: LondonIcon, name: 'London', country: 'UK' },
  { id: 3, img: SanFranciscoIcon, name: 'San Francisco', country: 'USA' },
]

const DestinationPage = () => {
    const [selectedDestination, setSelectedDestination] = useState('');
    const {userChoices, setUserChoices} = useContext(UserChoicesContext);
    const navigate = useNavigate();
    

    const handleSelect = (cityName) => {
        setSelectedDestination(cityName);
        setUserChoices({...userChoices, "city": cityName})
    };

    const handleNext = () => {
        navigate('/preferences');
    };

    return (
        <div className="container">
            <h2>Which city would you like to explore?</h2>
            <div className="city-container">
              {cities.map((city) => (
                <div
                  key={city.id}
                  className={`city-card ${selectedDestination === city.name ? 'selected' : ''}`}
                  onClick={() => handleSelect(city.name)}
                >
                  <img style={{height:"150px"}} src={city.img} alt={city.name} className="city-img" />
                  <h3>{city.name}</h3>
                  <p>{city.country}</p>
                </div>
              ))}
            </div>
            <NextButton onClick={handleNext} disabled={!selectedDestination} />
        </div>
    );
};

export default DestinationPage;
