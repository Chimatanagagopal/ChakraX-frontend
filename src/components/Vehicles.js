import React from 'react';
import '../style.css'; // your existing global CSS

const imageMap = {
    auto: '/images/auto.png',      // Local image
    bike: '/images/bike.png',      // Local image
    scooty: '/images/scooty.png',  // Local image
    parcel: '/images/parcel.png',  // Local image
    // Cabs (cab-non-ac and cab-premium) have been removed as requested.
};

const Vehicles = ({ vehicles, selectedVehicleId, onVehicleSelect }) => {
    // Filter out cabs from the vehicles array if they are still somehow being passed
    const filteredVehicles = vehicles ? vehicles.filter(
        vehicle => vehicle.id !== 'cab-non-ac' && vehicle.id !== 'cab-premium'
    ) : [];

    if (filteredVehicles.length === 0) {
        console.log("Vehicles component: No vehicles data to display after filtering cabs.");
        return null;
    }

    return (
        <>
            <h1 className="vehicle-h1">Select a service</h1>
            <div className="vehicle-grid-container">
                {filteredVehicles.map(vehicle => { // Use filteredVehicles here
                    const isSelected = selectedVehicleId === vehicle.id;
                    const imagePath = imageMap[vehicle.id]; // Get path/URL from map
                    
                    // Fallback to placeholder.png if imagePath is undefined or null
                    const imageSrc = imagePath || '/images/placeholder.png'; 

                    return (
                        <div
                            key={vehicle.id}
                            className={`vehicle-book ${vehicle.id === 'parcel' ? 'parcel-card' : ''} ${isSelected ? 'selected-card' : ''}`}
                            onClick={() => {
                                console.log(`Attempting to select vehicle: ${vehicle.name} (ID: ${vehicle.id})`);
                                onVehicleSelect(vehicle);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={imageSrc}
                                alt={vehicle.name}
                                style={{ width: '80px', height: '60px' }}
                                onError={(e) => {
                                    // This error means the specific image (local) failed
                                    // OR the 'placeholder.png' failed if that's what was tried.
                                    console.error(`Failed to load image for ${vehicle.name}. Original path attempted: ${imageSrc}.`);
                                    e.target.onerror = null; // Prevent infinite loop if fallback also fails
                                    e.target.src = '/images/placeholder.png'; // Fallback to local placeholder
                                }}
                            />
                            <p className="vehicle-name">{vehicle.name}</p>
                            <div className="vehicle-fare-display">
                                <span>₹{vehicle.fare}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Vehicles;