// src/components/UpiOptions.jsx
import React from 'react';
import '../style.css';

const UpiOptions = ({ selectedUpiApp, onSelectUpiApp }) => {
  const upiApps = [
    { id: 'gpay', name: 'Google Pay', imageUrl: '/images/gpay.png' },
    { id: 'phonepe', name: 'PhonePe', imageUrl: '/images/phonepe.png' }, // make sure full name is phonepe.png
    { id: 'paytm', name: 'Paytm', imageUrl: '/images/paytm.png' },
    { id: 'bhim', name: 'BHIM UPI', imageUrl: '/images/bhim.png' }, // Add this image to public/images/
  ];

  return (
    <div className="upi-options" id="upi-apps">
      <h5>Select UPI App:</h5>
      {upiApps.map((app) => (
        <div
          key={app.id}
          className={`upi-option ${selectedUpiApp === app.id ? 'selected' : ''}`}
          onClick={() => onSelectUpiApp(app.id)}
        >
          <img
            src={app.imageUrl}
            alt={app.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/placeholder.png'; // Optional fallback
            }}
          />
          <span>{app.name}</span>
        </div>
      ))}
    </div>
  );
};

export default UpiOptions;
