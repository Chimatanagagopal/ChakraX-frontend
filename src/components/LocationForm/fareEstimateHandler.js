import { calculateFare } from '../FareEstimates';

export const getFareEstimateHandler = ({
  setDistance,
  setDuration,
  setFare,
  setOriginLocation,
  setDestinationLocation,
  setVehicleFares,
  setSelectedVehicleId,
  servicesConfig,
}) => {
  console.log('Get Fare Estimate button clicked');

  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");

  if (!fromInput || !toInput) {
    alert("Origin and destination inputs not found.");
    return;
  }

  const from = fromInput.value.trim();
  const to = toInput.value.trim();

  if (!from || !to) {
    alert("Please enter both origin and destination.");
    return;
  }

  if (!window.google || !window.google.maps) {
    alert("Google Maps API not loaded yet.");
    return;
  }

  const mapElement = document.getElementById("map");
  if (!mapElement) {
    alert("Map container not found.");
    return;
  }

  if (!window.myDirectionsRenderer) {
    alert("Map not initialized. Please ensure MapComponent is loaded.");
    return;
  }

  const directionsService = new window.google.maps.DirectionsService();

  directionsService.route(
    {
      origin: from,
      destination: to,
      travelMode: window.google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        window.myDirectionsRenderer.setDirections(response);

        const route = response.routes[0].legs[0];
        const distanceText = route.distance.text;
        const distanceValue = route.distance.value / 1000;
        const durationText = route.duration.text;
        const durationSeconds = route.duration.value;
        const durationMinutes = durationSeconds / 60;

        const overallFareEstimate = Math.round(30 + distanceValue * 10);

        const calculatedVehicleFares = servicesConfig.map(service => {
          const { minFare, maxFare } = calculateFare(distanceValue, durationMinutes, service.name);
          return {
            id: service.id,
            name: service.name,
            type: service.type,
            imageUrl: `/images/${service.id}.png`,  // ✅ Corrected to match Vehicles.jsx expectations
            minFare,
            maxFare
          };
        });

        setDistance(distanceText);
        setDuration(durationText);
        setFare(`₹${overallFareEstimate}`);
        setOriginLocation(from);
        setDestinationLocation(to);
        setVehicleFares(calculatedVehicleFares);
        setSelectedVehicleId(null);
      } else {
        alert("Directions request failed: " + status);

        setDistance('');
        setDuration('');
        setFare('');
        setOriginLocation('');
        setDestinationLocation('');
        setVehicleFares([]);
        setSelectedVehicleId(null);
      }
    }
  );
};
