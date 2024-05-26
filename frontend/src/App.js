import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserChoicesProvider } from './components/UserChoicesProvider';
import HomePage from './pages/HomePage';
import DestinationPage from './pages/DestinationPage';
import PreferencesPage from './pages/PreferencesPage';
import QuestionPage from './pages/QuestionPage';
import ItineraryPage from './pages/ItineraryPage';

const App = () => {
    return (
      <UserChoicesProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/destination" element={<DestinationPage />} />
                <Route path="/preferences" element={<PreferencesPage />} />
                <Route path="/questions" element={<QuestionPage />} />
                <Route path="/itinerary" element={<ItineraryPage />} />
            </Routes>
        </Router>
      </UserChoicesProvider>
    );
};

export default App;
