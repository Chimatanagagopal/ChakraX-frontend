
export async function calcRoute({
  setDistance,
  setDuration,
  setFare,
  setOriginLocation,     
  setDestinationLocation,
  setVehicleFares,
  servicesConfig,
}) {
  const from = document.getElementById("from")?.value.trim();
  const to = document.getElementById("to")?.value.trim();

  if (!from || !to) {
    alert("Please enter both origin and destination.");
    return;
  }

  if (!window.google || !window.google.maps) {
    alert("Google Maps API not loaded yet.");
    return;
  }

  const directionsService = new window.google.maps.DirectionsService();
  const geocoder = new window.google.maps.Geocoder();

  // Helper to get LatLng from a place name
  const getLatLng = (address) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0].geometry.location);
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  };

  try {
    const originLatLng = await getLatLng(from);
    const destinationLatLng = await getLatLng(to);

    // Callbacks to update LocationForm state with both name and LatLng
    setOriginLocation({ name: from, latLng: { lat: originLatLng.lat(), lng: originLatLng.lng() } });
    setDestinationLocation({ name: to, latLng: { lat: destinationLatLng.lat(), lng: destinationLatLng.lng() } });


    directionsService.route(
      {
        origin: originLatLng,
        destination: destinationLatLng,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {

          const route = response.routes[0].legs[0];
          const distanceKm = route.distance.value / 1000;
          const duration = route.duration.text;

          const fare = Math.round(30 + distanceKm * 10);

          const vehicleFares = Object.entries(servicesConfig).map(
            ([id, config]) => {
              const imageId = config.name
                .toLowerCase()
                .replace(/\s+/g, "_")
                .replace(/[^\w\-]/g, "");

              return {
                id: imageId,
                name: config.name,
                fare: Math.round(config.baseFare + distanceKm * config.perKm),
              };
            }
          );

          setDistance(route.distance.text);
          setDuration(duration);
          setFare(fare);
          setVehicleFares(vehicleFares);

        } else {
          alert("Failed to fetch directions: " + status);
          setDistance('');
          setDuration('');
          setFare('');
          setOriginLocation({ name: from, latLng: null });
          setDestinationLocation({ name: to, latLng: null });
          setVehicleFares([]);
        }
      }
    );

  } catch (error) {
    console.error("Error geocoding locations:", error);
    alert("Could not find one or both locations. Please try again.");
    setDistance('');
    setDuration('');
    setFare('');
    setOriginLocation({ name: from, latLng: null });
    setDestinationLocation({ name: to, latLng: null });
    setVehicleFares([]);
  }
}