import React from 'react';
import './TotalCost.css';

const TotalCost = ({ totalCosts, handleClick, ItemsDisplay }) => {
  const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;

  return (
    <div className="pricing-app">
      <div className="display_box">
        <div className="header">
          <button className="close-btn" onClick={handleClick}>✕</button>
          <h3>Total cost for the event</h3>
        </div>
        <div className="display_box1">
          <ItemsDisplay />
          <div className="total-cost-summary">
            <h2>Total: ${total_amount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCost;