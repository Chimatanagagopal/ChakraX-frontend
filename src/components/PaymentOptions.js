import React, { useState } from 'react';
import UpiOptions from './UpiOptions';
import '../style.css'; // Keep your existing global CSS

const PaymentOptions = ({
    onSelectPaymentMethod,
    onSelectUpiApp,
    selectedPaymentMethod,
    selectedUpiApp,
    origin,
    destination,
    fare,
    onRideConfirmedSuccess,
    walletBalance, // <-- NEW PROP: current wallet balance
    onWalletDeduct, // <-- NEW PROP: function to deduct from wallet
}) => {
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [message, setMessage] = useState('');

    const handlePaymentMethodClick = (method) => {
        onSelectPaymentMethod(method);
        if (method !== 'upi') {
            onSelectUpiApp(null);
        }
    };

    const handleConfirmRide = async () => {
        // --- NEW: Check wallet balance if payment method is wallet ---
        if (selectedPaymentMethod === 'wallet' && walletBalance < fare) {
            setMessage('❌ Insufficient wallet balance. Please choose another method or add funds.');
            // Also, make sure the button state reflects this immediately without needing to re-render
            setIsConfirming(false); // Make sure it's not stuck in confirming state
            return; // Stop the confirmation process
        }
        // --- End NEW ---

        setIsConfirming(true);
        setMessage('⏳ Waiting for confirmation...');

        setTimeout(async () => {
            const rideData = {
                origin,
                destination,
                fare,
            };

            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8000/rides/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify(rideData),
                });

                if (response.ok) {
                    // --- NEW: Deduct from wallet if wallet was used ---
                    if (selectedPaymentMethod === 'wallet' && onWalletDeduct) {
                        onWalletDeduct(fare); // Deduct the fare
                    }
                    // --- End NEW ---

                    setIsConfirmed(true);
                    setMessage('🎉 Ride confirmed successfully!');
                    // Optionally clear the message after a few seconds if you want
                    // setTimeout(() => setMessage(''), 3000);
                    if (onRideConfirmedSuccess) {
                        onRideConfirmedSuccess();
                    }
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    const errorMessage = errorData.detail || 'Failed to confirm ride. Please try again.';
                    setMessage(`❌ ${errorMessage}`);
                    setIsConfirmed(false);
                }
            } catch (error) {
                console.error("Error confirming ride:", error);
                setMessage('⚠️ Error connecting to server or unexpected issue.');
                setIsConfirmed(false);
            } finally {
                setIsConfirming(false);
            }
        }, 1000);
    };

    const paymentMethods = [
        { method: 'wallet', label: 'Wallet', icon: 'wallet.png' },
        { method: 'cash', label: 'Cash', icon: 'cash.png' },
        { method: 'upi', label: 'UPI', icon: 'upi.png' },
    ];

    return (
        <div className="payment-options-container">
            <h3>Choose Your Payment Method</h3>
            <ul className="payment-options-list">
                {paymentMethods.map(({ method, label, icon }) => (
                    <li
                        key={method}
                        className={`payment-option-item ${selectedPaymentMethod === method ? 'selected' : ''}`}
                        onClick={() => handlePaymentMethodClick(method)}
                    >
                        <img
                            src={`/images/${icon}`}
                            alt={label}
                            className="payment-icon"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/pic.png'; // Make sure this placeholder exists in public/images/
                            }}
                        />
                        <span>{label}</span>
                    </li>
                ))}
            </ul>

            {selectedPaymentMethod === 'upi' && (
                <UpiOptions
                    selectedUpiApp={selectedUpiApp}
                    onSelectUpiApp={onSelectUpiApp}
                />
            )}

            {selectedPaymentMethod && !isConfirmed && (
                <button
                    className="confirm-ride-button"
                    onClick={handleConfirmRide}
                    disabled={isConfirming || (selectedPaymentMethod === 'wallet' && walletBalance < fare)} // Disable if wallet and insufficient funds
                >
                    {isConfirming ? 'Confirming...' : 'Confirm Ride'}
                </button>
            )}

            {message && <p className="confirmation-message">{message}</p>}
        </div>
    );
};

export default PaymentOptions;