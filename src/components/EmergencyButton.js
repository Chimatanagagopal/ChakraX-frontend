import React from 'react';

function EmergencyButton() {
  const handleSosClick = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = `🚨 Emergency SOS!/nMy location: ${locationLink}`;

        console.log('SOS triggered at location:', latitude, longitude);

        // Choose one: WhatsApp or SMS
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
        const smsURL = `sms:?body=${encodeURIComponent(message)}`;

        window.open(whatsappURL, '_blank');
      },
      (error) => {
        console.error('Error fetching location:', error);
        alert('Unable to fetch location. Please ensure location services are enabled.');
      }
    );
  };

  return (
    <button
      id="sosButton"
      className="btn sos-btn"
      onClick={handleSosClick}
    >
      🚨 Emergency SOS
    </button>
  );
}

export default EmergencyButton;
