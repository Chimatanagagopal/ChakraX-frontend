// components/WalletModal.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import '../style.css'; // Keep styling in same CSS

const WalletModal = ({ onClose }) => {
  const [modalShow, setModalShow] = useState(false); // New state for modal visibility animation

  useEffect(() => {
    // Start modal animation right after component mounts
    setModalShow(true);
  }, []);

  // Function to handle close animation before calling onClose prop
  const handleClose = () => {
    setModalShow(false); // Trigger fade-out animation
    // Call actual onClose after animation duration (0.3s)
    // You can adjust this timeout to match your CSS transition duration precisely
    setTimeout(onClose, 300);
  };

  return (
    // The modal-backdrop wraps the modal content for the overlay
    // It gets the 'show' class to fade in the background
    <div className={`modal-backdrop ${modalShow ? 'show' : ''}`} onClick={handleClose}>
      {/* The actual modal content container */}
      {/* It reuses 'wallet-modal' for its large, centered styling and gets 'show' for its animation */}
      {/* onClick={e => e.stopPropagation()} prevents clicks inside the modal from closing it */}
      <div className={`wallet-modal ${modalShow ? 'show' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="wallet-header">
          <h3>Wallet Balance</h3>
          {/* Use handleClose for the close button */}
          <button className="wallet-close" onClick={handleClose}>×</button>
        </div>

        {/* Existing wallet content */}
        <p className="wallet-balance">₹450.00</p>

        <div className="wallet-history">
          <h4>Recent Transactions</h4>
          <ul>
            <li>+ ₹200 Added - UPI - 18 July</li>
            <li>- ₹150 Ride Fare - 17 July</li>
            <li>+ ₹100 Cashback - 16 July</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;