// src/components/LocationForm/LocationDisplay.jsx

import React from 'react';

const LocationDisplay = ({ originLocation, destinationLocation }) => (
  <div className="location-display-container" id="entered-locations-display">
    <div className="location-display-item">
      <i className="fa-solid fa-circle-dot location-icon pickup-icon"></i>
      <span className="location-text" id="display-origin-location">{originLocation}</span>
    </div>
    <div className="location-display-item">
      <i className="fa-solid fa-location-dot location-icon drop-icon"></i>
      <span className="location-text" id="display-destination-location">{destinationLocation}</span>
    </div>
  </div>
);

export default LocationDisplay;
