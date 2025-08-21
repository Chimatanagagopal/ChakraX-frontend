import React, { useState } from 'react';
import { FaPlus, FaCog, FaBars, FaSearch } from 'react-icons/fa';
import axios from 'axios';

import WalletModal from './WalletModal';
import ProfileModal from './ProfileModal';
import RideHistory from './RideHistory';
import RideFeedback from './RideFeedback';
import RideAssistantChatbot from './RideAssistantChatbot';

import '../style.css';

const GeminiLeftSidebar = ({ onMenuItemClick, activeMenuItem, setIsAuthenticated }) => {
    const [walletOpen, setWalletOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [rideHistoryOpen, setRideHistoryOpen] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [latestRideId, setLatestRideId] = useState(null);

    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        if (typeof setIsAuthenticated === 'function') {
            setIsAuthenticated(false);
        } else {
            console.error('setIsAuthenticated is not a function!');
        }
    };

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

    const handleItemClick = (item) => {
        setWalletOpen(false);
        setProfileOpen(false);
        setRideHistoryOpen(false);
        setFeedbackOpen(false);
        setChatbotOpen(false);

        if (item === 'wallet') {
            setWalletOpen(true);
        } else if (item === 'profile') {
            setProfileOpen(true);
        } else if (item === 'rideHistory') {
            setRideHistoryOpen(true);
        } else if (item === 'sendFeedback') {
            openFeedbackModal();
        } else if (item === 'chatAssistant') {
            setChatbotOpen(true);
        } else if (item === 'logout') {
            handleLogout();
        }

        // Pass the clicked item to the parent for content rendering
        if (onMenuItemClick) {
            onMenuItemClick(item);
        }
    };

    return (
        <>
        
        <div className="sidebar-container">
            
            <ul className="sidebar-nav-list">
               <li>
                <div className="heading-img">
            <h2><b>ChakraX</b></h2>
          </div>
               </li>
                <li
                    className={activeMenuItem === 'wallet' ? 'active' : ''}
                    onClick={() => handleItemClick('wallet')}
                >
                    Wallet
                </li>
                <li
                    className={activeMenuItem === 'profile' ? 'active' : ''}
                    onClick={() => handleItemClick('profile')}
                >
                    Profile
                </li>
                <li
                    className={activeMenuItem === 'rideHistory' ? 'active' : ''}
                    onClick={() => handleItemClick('rideHistory')}
                >
                    Ride History
                </li>
                <li
                    className={activeMenuItem === 'sendFeedback' ? 'active' : ''}
                    onClick={() => handleItemClick('sendFeedback')}
                >
                    Send Feedback
                </li>
                <li
                    className={activeMenuItem === 'chatAssistant' ? 'active' : ''}
                    onClick={() => handleItemClick('chatAssistant')}
                >
                    Chat with Assistant
                </li>
                <li onClick={() => handleItemClick('contactUs')}>Contact Us</li>
                <li onClick={() => handleItemClick('logout')}>Logout</li>
            </ul>

           

            {walletOpen && <WalletModal onClose={() => setWalletOpen(false)} />}
            {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
            {rideHistoryOpen && <RideHistory onClose={() => setRideHistoryOpen(false)} />}
            {feedbackOpen && latestRideId && (
                <RideFeedback
                    rideId={latestRideId}
                    token={token}
                    onClose={() => setFeedbackOpen(false)}
                />
            )}
            {chatbotOpen && (
                <div className="chatbot-overlay">
                    <RideAssistantChatbot onClose={() => setChatbotOpen(false)} />
                </div>
            )}
        </div>
        </>
    );
};

export default GeminiLeftSidebar;