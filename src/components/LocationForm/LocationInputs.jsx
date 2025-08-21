// src/components/LocationForm/LocationInputs.jsx

import React from 'react';

const LocationInputs = ({ handleGetFareEstimate }) => (
  <div className="location-search modern-ui">
    <div className="form-group">
      <label htmlFor="from" className="form-label">Pickup Location</label>
      <div className="input-icon-wrapper">
        <i className="fa-solid fa-location-dot input-icon"></i>
        <input
          type="text"
          id="from"
          name="from"
          className="form-control enhanced-input"
          placeholder="Enter Pickup Location"
          autoComplete="off"
        />
      </div>
    </div>

    <div className="form-group">
      <label htmlFor="to" className="form-label">Drop Location</label>
      <div className="input-icon-wrapper">
        <i className="fa-solid fa-map-location-dot input-icon"></i>
        <input
          type="text"
          id="to"
          name="to"
          className="form-control enhanced-input"
          placeholder="Enter Drop Location"
          autoComplete="off"
        />
      </div>
    </div>

    <div className="form-group">
      <button
        type="button"
        onClick={handleGetFareEstimate}
        className="search-button modern-btn"
      >
        🚕 Get Fare Estimate
      </button>
    </div>
  </div>
);

export default LocationInputs;
