// components/RideFeedback.jsx
import React, { useState, useEffect } from 'react';
import '../feedback.css';
import axios from 'axios';

const RideFeedback = ({ rideId, token, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // 🔐 Prevent outside click from closing before submission
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const modal = document.querySelector('.modal');
      if (modal && !modal.contains(e.target)) {
        if (submitted) onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [submitted, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.patch(
        `http://localhost:8000/rides/${rideId}/`,
        { rating, feedback },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError('Failed to submit feedback. Try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Rate Your Ride</h2>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                cursor: 'pointer',
                color: rating >= star ? 'gold' : 'gray',
                fontSize: '24px',
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        {submitted && <p className="success">✅ Feedback submitted!</p>}

        {!submitted && (
          <>
            <button className="submit-button" onClick={handleSubmit}>
              Submit Feedback
            </button>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RideFeedback;
