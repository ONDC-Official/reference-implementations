const constants = require("./constants");

const getReverseGeocode = (lat, long) => {
  let addr = {};
  const requestOptions = {
    method: "GET",
  };
  // console.log(process.env.API_KEY);
  // const API_KEY = constants.API_KEY;
  console.log(constants);
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${API_KEY}`;

  //   console.log(process.env.API_KEY);
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // const address = result.features[0].properties;
      console.log(result);
      // addr.area_code = address.postcode;
      // addr.state = address.state;
      // addr.city = address.city;
      // addr.country = address.country;
      // addr.state_code = address.state_code;

      // return addr;
    })
    .catch((error) =>
      console.log("!!Error while fetching reverse geocoded address", error)
    );
};

module.exports = { getReverseGeocode };
