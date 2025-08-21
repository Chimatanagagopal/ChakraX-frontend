


import React from 'react';



function RideStatus({ statusMessage }) {

  return (

    <div id="rideStatusContainer" style={{ textAlign: 'center', padding: '10px' }}>

      {statusMessage ? (

        <p style={{ fontWeight: 'bold', color: '#007bff' }}>{statusMessage}</p>

      ) : (

        <p>No active ride status</p>

      )}

    </div>

  );

}



export default RideStatus;