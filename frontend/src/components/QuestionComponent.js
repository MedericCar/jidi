import React from 'react';
import './QuestionComponent.css';

const QuestionComponent = ({ question, choices, selectedChoices, onSelectChoice }) => (
  <div className="question-container">
    <h2 className="question">{question}</h2>
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

export default QuestionComponent;
