import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerComponent from '../components/SpinnerComponent';
import QuestionComponent from '../components/QuestionComponent';
import NextButton from '../components/NextButton';
import { UserChoicesContext } from '../components/UserChoicesProvider';
import { v4 as uuidv4 } from 'uuid';

import './QuestionPage.css';

const fetchQuestionFromAPI = async (index, userChoices, uuid) => {
  const generateInputText = (index, userChoices) => {
    if (index === 0) {
      return `Here is the information: ${JSON.stringify(userChoices)}.\nReturn question ${index + 1} as JSON:`;
    } else {
      const lastQuestion = userChoices.questions[userChoices.questions.length - 1];
      return `User picked ${JSON.stringify(lastQuestion.answers)} for the previous question.\nReturn question ${index + 1} as JSON:`;
    }
  };

  try {
    const inputText = generateInputText(index, userChoices);

    const response = await fetch('http://127.0.0.1:8000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText, chat_uuid: uuid }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};

const fetchPlanningFromAPI = async (userChoices) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/planner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: `Here is the information about the trip and the customer preferences: ${JSON.stringify(userChoices)}.\nReturn your plan as JSON:`}),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const { userChoices, setUserChoices } = useContext(UserChoicesContext);
  const [uuid, setUuid] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a new UUID when the component mounts
    const newUuid = uuidv4();
    setUuid(newUuid);
  }, []);

  useEffect(() => {
    const loadQuestion = async () => {
      setLoading(true);
      console.log(userChoices);
      try {
        const data = await fetchQuestionFromAPI(currentQuestionIndex, userChoices, uuid);
        setQuestionData(data);
      } catch (error) {
        console.error('Error loading question:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uuid) {
      loadQuestion();
    }
  }, [currentQuestionIndex, uuid]); // Potential issue here not having userChoices

  const handleNext = async () => {
    // Add the current question and selected choices to the userChoices context
    setUserChoices((prevUserChoices) => ({
      ...prevUserChoices,
      questions: [
        ...(prevUserChoices.questions || []),
        {
          question: questionData.question,
          answers: selectedChoices,
        },
      ],
    }));

    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoices([]);
    } else {
      console.log("Stepping in the last call");
      setLoading(true);

      try {
        console.log("Calling LLM");
        const result = await fetchPlanningFromAPI(userChoices);
        console.log("Got result back from LLM", result);
        console.log(loading);

        navigate('/itinerary', { state: { itinerary: result } });
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectChoice = (choice) => {
    setSelectedChoices((prevSelected) =>
      prevSelected.includes(choice)
        ? prevSelected.filter((c) => c !== choice)
        : [...prevSelected, choice]
    );
  };

  return (
    <div className="question-page">
      {loading && <SpinnerComponent />}
      {!loading && questionData && (
        <>
          <QuestionComponent
            question={questionData.question}
            choices={questionData.choices}
            selectedChoices={selectedChoices}
            onSelectChoice={handleSelectChoice}
          />
          <NextButton onClick={handleNext} disabled={loading || selectedChoices.length === 0} />
        </>
      )}
    </div>
  );
};

export default QuestionPage;
