// // src/components/RideFeedback.jsx

// import React, { useState, useEffect } from 'react';
// import '../style.css'; // Make sure this path is correct for your modal styles
// import axios from 'axios'; // Ensure axios is installed: npm install axios

// const RideFeedback = ({ rideId, token, onClose }) => {
//   const [rating, setRating] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission

//   // Effect to handle outside click to close modal ONLY after submission
//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       const modal = document.querySelector('.modal');
//       if (modal && !modal.contains(e.target)) {
//         if (submitted) onClose(); // Only close on outside click if feedback is submitted
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => document.removeEventListener('mousedown', handleOutsideClick);
//   }, [submitted, onClose]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (rating === 0) {
//       setError('Please select a star rating.');
//       return;
//     }

//     setIsSubmitting(true); // Disable button
//     try {
//       const response = await axios.patch(
//         `http://localhost:8000/rides/${rideId}/`, // Your Django backend endpoint for updating a ride
//         { rating, feedback },
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.status === 200) { // Check for successful update status
//         setSubmitted(true);
//         // Automatically close the modal after a short delay
//         setTimeout(() => {
//           onClose(); // Triggers resetRideState in LocationForm
//         }, 1500);
//       } else {
//         // Handle non-200 responses
//         setError('Failed to submit feedback. Please try again.');
//       }
//     } catch (err) {
//       console.error('Feedback submission error:', err);
//       if (err.response && err.response.data && err.response.data.detail) {
//         setError(`Error: ${err.response.data.detail}`);
//       } else if (err.message) {
//         setError(`Error: ${err.message}`);
//       } else {
//         setError('Something went wrong. Please try again.');
//       }
//     } finally {
//       setIsSubmitting(false); // Re-enable button
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div
//         className="modal"
//         onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
//       >
//         <h2>Rate Your Ride</h2>

//         <div className="stars">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               onClick={() => setRating(star)}
//               style={{
//                 cursor: 'pointer',
//                 color: rating >= star ? 'gold' : 'gray',
//                 fontSize: '24px',
//                 transition: 'color 0.2s ease', // Smooth transition for star color
//               }}
//             >
//               ★
//             </span>
//           ))}
//         </div>

//         <textarea
//           placeholder="Write feedback (optional)"
//           value={feedback}
//           onChange={(e) => setFeedback(e.target.value)}
//           rows="4" // Set a default number of rows
//         />

//         {error && <p className="error">{error}</p>}
//         {submitted && <p className="success">✅ Feedback submitted!</p>}

//         {!submitted && ( // Only show buttons if feedback hasn't been submitted yet
//           <>
//             <button
//               className="submit-button"
//               onClick={handleSubmit}
//               disabled={rating === 0 || isSubmitting} // Disable if no rating or submitting
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
//             </button>
//             <button className="close-button" onClick={onClose} disabled={isSubmitting}>
//               Close
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RideFeedback;