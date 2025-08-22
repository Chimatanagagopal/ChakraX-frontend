import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';
import RideFeedback from './RideFeedback';

const RideHistory = ({ onClose }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);

  useEffect(() => {
    setModalShow(true);

    const token = localStorage.getItem('token');
    axios
      .get('https://chakrax-backend1-22.onrender.com/rides/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setRides(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching ride history:', error);
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setModalShow(false);
    setTimeout(onClose, 300);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (modalShow || feedbackOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalShow, feedbackOpen]);

  return (
    <>
      <div
        className={`modal-backdrop ${modalShow ? 'show' : ''}`}
        onClick={(e) => {
          // ✅ Only close if clicked directly on backdrop and feedback not open
          if (
            !feedbackOpen &&
            e.target.classList.contains('modal-backdrop')
          ) {
            handleClose();
          }
        }}
      >
        <div
          className={`wallet-modal scrollable-modal ${modalShow ? 'show' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="wallet-header">
            <h3>Ride History</h3>
            <button className="wallet-close" onClick={handleClose}>
              ×
            </button>
          </div>

          {loading ? (
            <p style={{ padding: '20px' }}>Loading...</p>
          ) : rides.length === 0 ? (
            <p style={{ padding: '20px' }}>No ride history found.</p>
          ) : (
            <div className="wallet-history">
              <ul>
                {rides.map((ride, idx) => (
                  <li key={idx}>
                    <b>Date:</b> {new Date(ride.ride_time).toLocaleString()}<br />
                    <hr></hr>
                    <b>From:</b> {ride.origin}
                    <br /><br />
                    <hr /><br />
                    <b>To:</b> {ride.destination}<br />
                    <hr /><br />
                    <b>Fare:</b> ₹{ride.fare}
                    <br />
                    {/* <button
                      className="feedback-button"
                      onClick={() => {
                        setSelectedRideId(ride.id);
                        setFeedbackOpen(true);
                      }}
                    >
                      Give Feedback
                    </button> */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Feedback modal rendered cleanly and independently */}
      {feedbackOpen && selectedRideId && (
        <RideFeedback
          rideId={selectedRideId}
          token={localStorage.getItem('token')}
          onClose={() => setFeedbackOpen(false)}
        />
      )}
    </>
  );
};

export default RideHistory;
