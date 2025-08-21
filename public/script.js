window.initializeMap = function () {
  const originInput = document.getElementById("from");
  const destinationInput = document.getElementById("to");

  if (originInput) {
    new google.maps.places.Autocomplete(originInput);
  }

  if (destinationInput) {
    new google.maps.places.Autocomplete(destinationInput);
  }

  console.log("Google Autocomplete initialized ✅");
};

