import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; // Make sure this import is present
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons

const ProfileModal = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false); // New state for modal visibility animation

  useEffect(() => {
    // Start modal animation right after component mounts
    setModalShow(true);

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/profiles/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('❌ Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Function to handle close animation before calling onClose prop
  const handleClose = () => {
    setModalShow(false); // Trigger fade-out animation
    setTimeout(onClose, 300); // Call actual onClose after animation duration (0.3s)
  };

  return (
    // The modal-backdrop wraps the modal content
    <div className={`modal-backdrop ${modalShow ? 'show' : ''}`} onClick={handleClose}>
      {/* The actual modal content, preventing click propagation */}
      {/* Re-using wallet-modal class for consistent styling */}
      <div className={`wallet-modal ${modalShow ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="wallet-header">
          <h3>Profile Information</h3>
          <button className="wallet-close" onClick={handleClose}>X</button>
        </div>

        {loading ? (
          <p style={{ padding: '20px' }}>Loading...</p>
        ) : !profile ? (
          <p style={{ padding: '20px' }}>No profile found.</p>
        ) : (
          <div className="profile-info">
            <p><FaUser style={{ marginRight: '8px' }} /><strong>Name:</strong> {profile.username}</p>
            <p><FaEnvelope style={{ marginRight: '8px' }} /><strong>Email:</strong> {profile.email}</p>
            <p><FaPhone style={{ marginRight: '8px' }} /><strong>Phone:</strong> {profile.phone_number}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;