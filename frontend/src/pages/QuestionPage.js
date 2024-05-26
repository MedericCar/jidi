import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerComponent from '../components/SpinnerComponent';
import QuestionComponent from '../components/QuestionComponent';
import NextButton from '../components/NextButton';
import { UserChoicesContext } from '../components/UserChoicesProvider';
import { v4 as uuidv4 } from 'uuid';

import './QuestionPage.css';

const fetchQuestionsFromAPI = async (userChoices, uuid) => {
  const inputText = `Here is the information:
City: ${userChoices.city}
Duration: ${userChoices.durationInDays}
Customer preferred categories: ${userChoices.preferredCategories}
Left out categories: ${userChoices.leftOutCategories}
Return the five questions as JSON:`;

  try {
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
    console.error('Error fetching questions:', error);
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
    console.error('Error fetching plan:', error);
    throw error;
  }
};

const QuestionPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const { userChoices, setUserChoices } = useContext(UserChoicesContext);
  const [uuid, setUuid] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const newUuid = uuidv4();
    setUuid(newUuid);
  }, []);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      setLoadingMessage("Great! Just a few additional questions based on your preferences");
      console.log(userChoices);
      try {
        const data = await fetchQuestionsFromAPI(userChoices, uuid);
        setQuestions(data);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uuid) {
      loadQuestions();
    }
  }, [uuid]);

  const handleNext = async () => {
    setUserChoices((prevUserChoices) => ({
      ...prevUserChoices,
      questions: [
        ...(prevUserChoices.questions || []),
        {
          question: questions[currentQuestionIndex].question,
          answers: selectedChoices,
        },
      ],
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedChoices([]);
    } else {
      console.log("Stepping in the last call");
      setLoading(true);
      setLoadingMessage("Perfect! Let me build your idea plan");

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
      {loading && <SpinnerComponent message={loadingMessage} />}
      {!loading && questions.length > 0 && (
        <>
          <QuestionComponent
            question={questions[currentQuestionIndex].question}
            choices={questions[currentQuestionIndex].choices}
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
