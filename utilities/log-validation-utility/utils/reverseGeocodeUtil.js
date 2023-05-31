const getReverseGeocode = (lat, long) => {
  const API_KEY = "b48dbcf59508428788fbc8d71139e411";
  const requestOptions = {
    method: "GET",
  };

  //   console.log(process.env.API_KEY);
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${API_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result.features[0].properties))
    .catch((error) => console.log("error", error));
};

getReverseGeocode("28.457523", "77.026344");

// module.exports = { getReverseGeocode };
