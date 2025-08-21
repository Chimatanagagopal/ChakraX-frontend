import { useEffect } from 'react';

function GooglePlacesMap() {
  useEffect(() => {
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");

    if (!fromInput || !toInput) {
      console.warn("Input elements not found.");
      return;
    }

    if (!window.google?.maps?.places) {
      console.warn("Google Places API not loaded.");
      return;
    }

    new window.google.maps.places.Autocomplete(fromInput);
    new window.google.maps.places.Autocomplete(toInput);
  }, []);

  return null;
}

export default GooglePlacesMap;
