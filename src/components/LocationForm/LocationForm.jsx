
import React, { useState, useEffect } from 'react';

import GoogleMap from '../GoogleMap';

import Vehicles from '../Vehicles';

import LocationInputs from './LocationInputs';

import FareDetails from './FareDetails';

import LocationDisplay from './LocationDisplay';

import PaymentOptions from '../PaymentOptions';

import RideStatus from '../RideStatus';

import { calcRoute } from '../calcRoute';

import { servicesConfig } from '../FareEstimates';



function LocationForm() {

  const [distance, setDistance] = useState('');

  const [duration, setDuration] = useState('');

  const [fare, setFare] = useState('');

  const [originLocation, setOriginLocation] = useState('');

  const [destinationLocation, setDestinationLocation] = useState('');

  const [originLatLng, setOriginLatLng] = useState(null);

  const [destinationLatLng, setDestinationLatLng] = useState(null);

  const [vehicleFares, setVehicleFares] = useState([]);

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const [selectedUpiApp, setSelectedUpiApp] = useState(null);

  const [rideStatus, setRideStatus] = useState('');

  const [rideConfirmed, setRideConfirmed] = useState(false);



  const handleGetFareEstimate = () =>

    calcRoute({

      setDistance,

      setDuration,

      setFare,

      setOriginLocation: (loc) => {

        setOriginLocation(loc.name);

        setOriginLatLng(loc.latLng);

      },

      setDestinationLocation: (loc) => {

        setDestinationLocation(loc.name);

        setDestinationLatLng(loc.latLng);

      },

      setVehicleFares: (fares) => {

        const updatedFares = fares.map(vehicle => ({

          ...vehicle,

          imageUrl: `/images/${vehicle.id}.png`,

        }));

        setVehicleFares(updatedFares);

        setRideStatus('Fare details fetched. Please select a vehicle.');

      },

      servicesConfig,

    });



  const handleVehicleSelect = (vehicle) => {

    setSelectedVehicleId(vehicle.id);

    setRideStatus(`Selected vehicle: ${vehicle.name}`);

  };



  const handlePaymentMethod = (method) => {

    setSelectedPaymentMethod(method);

    setRideStatus(`Selected payment method: ${method}`);

  };



  const handleUpiApp = (app) => {

    setSelectedUpiApp(app);

    setRideStatus(`Selected UPI App: ${app}`);

  };



  const handleRideConfirmationSuccess = () => {

    setRideConfirmed(true);

    setRideStatus('🎉 Ride confirmed successfully! Vehicle is on its way.');

  };



  useEffect(() => {

    setRideConfirmed(false);

    setSelectedVehicleId(null);

    setSelectedPaymentMethod(null);

    setSelectedUpiApp(null);

    if (!originLocation && !destinationLocation) {

      setRideStatus('');

    } else if (originLocation && destinationLocation && !fare) {

      setRideStatus('Enter valid locations to get fare estimate.');

    }

  }, [originLocation, destinationLocation]);



  return (

    <form className="form-horizontal">

      <div className="location-search-wrapper">

        <LocationInputs handleGetFareEstimate={handleGetFareEstimate} />



        {distance && duration && fare && (

          <FareDetails distance={distance} duration={duration} fare={fare} />

        )}



        {originLocation && destinationLocation && (

          <LocationDisplay

            originLocation={originLocation}

            destinationLocation={destinationLocation}

          />

        )}



        {vehicleFares.length > 0 && (

          <Vehicles

            vehicles={vehicleFares}

            selectedVehicleId={selectedVehicleId}

            onVehicleSelect={handleVehicleSelect}

          />

        )}



        {selectedVehicleId && (

          <PaymentOptions

            selectedPaymentMethod={selectedPaymentMethod}

            onSelectPaymentMethod={handlePaymentMethod}

            selectedUpiApp={selectedUpiApp}

            onSelectUpiApp={handleUpiApp}

            origin={originLocation}

            destination={destinationLocation}

            fare={fare}

            onRideConfirmedSuccess={handleRideConfirmationSuccess}

          />

        )}



        <RideStatus statusMessage={rideStatus} />

        <GoogleMap

          origin={originLatLng}

          destination={destinationLatLng}

          rideConfirmed={rideConfirmed}

          duration={duration}

        />

      </div>

    </form>

  );

}



export default LocationForm; 


