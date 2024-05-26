import React, { useState, useEffect } from 'react';
import './QuestionComponent.css';

const QuestionComponent = ({ question, choices, selectedChoices, onSelectChoice }) => {
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset the state when the question prop changes
    setDisplayedQuestion('');
    setCurrentIndex(0);
  }, [question]);

  useEffect(() => {
    if (currentIndex < question.length) {
      const timeout = setTimeout(() => {
        setDisplayedQuestion(prevText => prevText + question[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 40);
  
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, question]);

  return (
    <div className="question-container">
      <h2 className="question">{displayedQuestion}</h2>
      <div className="choices-container">
        {choices.map((choice, index) => (
          <div
            key={index}
            className={`choice-box ${selectedChoices.includes(choice) ? 'selected' : ''}`}
            onClick={() => onSelectChoice(choice)}
          >
            {choice}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
