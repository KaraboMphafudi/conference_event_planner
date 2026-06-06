import React, { useState } from 'react';
import ConferenceEvent from './ConferenceEvent';
import './App.css';

function App() {
  const [showVenue, setShowVenue] = useState(false);

  const handleGetStarted = () => {
    setShowVenue(true);
  };

  if (!showVenue) {
    return (
      <div className="landing-page">
        <div className="overlay"></div>
        <div className="landing-content">
          <h1 className="company-name">BudgetEase</h1>
          <p className="company-tagline">Plan your next major event with us!</p>
          <div className="company-description">
            <p>
              BudgetEase is your trusted partner for organizing successful conferences and events. 
              With years of experience in venue management, we provide comprehensive solutions 
              that make event planning simple, transparent, and cost-effective.
            </p>
            <p>
              Our conference expense planner helps you calculate every aspect of your event - 
              from venue selection and audio-visual equipment to catering for your guests. 
              Get a complete cost breakdown before you commit.
            </p>
          </div>
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return <ConferenceEvent />;
}

export default App;