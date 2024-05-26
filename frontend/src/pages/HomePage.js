import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NextButton from '../components/NextButton';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/destination');
    };

    return (
        <div className="home-container">
            <h1>Jidi</h1>
            <p>Your next adventure awaits</p>
            <NextButton onClick={handleNext} />
        </div>
    );
};

export default HomePage;
