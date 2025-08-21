import React, { useState, useRef, useEffect } from 'react';
import '../style.css';
import { FaCaretDown } from 'react-icons/fa';
import WalletModal from './WalletModal';
import ProfileModal from './ProfileModal';
import RideHistory from './RideHistory';
import RideFeedback from './RideFeedback';
import RideAssistantChatbot from './RideAssistantChatbot'; // Import the chatbot component
import axios from 'axios';

const ProfileMenu = ({ setIsAuthenticated }) => {
  const [open, setOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [rideHistoryOpen, setRideHistoryOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false); // New state for chatbot
  const [latestRideId, setLatestRideId] = useState(null);
  const menuRef = useRef(null);

  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    if (typeof setIsAuthenticated === 'function') {
      setIsAuthenticated(false);
    } else {
      console.error('setIsAuthenticated is not a function!');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest('.account-button')
      ) {
        setOpen(false);
        setWalletOpen(false);
        setProfileOpen(false);
        setRideHistoryOpen(false);
        // ❌ DO NOT close feedbackOpen or chatbotOpen here, they will have their own close mechanisms
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openFeedbackModal = async () => {
    try {
      const response = await axios.get('http://localhost:8000/rides/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const rides = response.data;
      if (rides.length > 0) {
        setLatestRideId(rides[0].id);
        setFeedbackOpen(true);
      } else {
        alert('No rides found to give feedback on.');
      }
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  return (
    <div className="account-menu">
      {/* <button className="account-button" onClick={() => setOpen(!open)}>
        My Account <FaCaretDown style={{ marginLeft: '5px' }} />
      </button> */}

      {/* ✅ Only show overlay if no modal (feedback, wallet, profile, ride history, chatbot) is open */}
      {open && !feedbackOpen && !walletOpen && !profileOpen && !rideHistoryOpen && !chatbotOpen && (
        <div className="overlay" onClick={() => setOpen(false)}></div>
      )}

      
      {walletOpen && <WalletModal onClose={() => setWalletOpen(false)} />}
      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
      {rideHistoryOpen && <RideHistory onClose={() => setRideHistoryOpen(false)} />}

      {/* ✅ Feedback modal rendered here */}
      {feedbackOpen && latestRideId && (
        <RideFeedback
          rideId={latestRideId}
          token={token}
          onClose={() => setFeedbackOpen(false)}
        />
      )}

      {/* ✅ Chatbot modal/sidebar rendered here */}
      {chatbotOpen && (
        <RideAssistantChatbot onClose={() => setChatbotOpen(false)} />
      )}
    </div>
  );
};

export default ProfileMenu;