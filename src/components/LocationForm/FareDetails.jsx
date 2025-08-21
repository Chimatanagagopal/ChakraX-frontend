// src/components/LocationForm/FareDetails.jsx

import React from 'react';

const FareDetails = ({ distance, duration, fare }) => (
  <div className="fare-details-container modern-fare-box" id="fare-details-container">
    <div className="fare-detail-item">
      <i className="fa-solid fa-route fare-icon"></i>
      <span className="fare-text">{distance || '-'}</span>
    </div>
    <div className="fare-detail-item">
      <i className="fa-solid fa-clock fare-icon"></i>
      <span className="fare-text">{duration || '-'}</span>
    </div>
    
  </div>
);

export default FareDetails;
