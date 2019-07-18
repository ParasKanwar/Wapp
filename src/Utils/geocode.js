const request = require("request");

const geolocation = (address, callback) => {
  const Curl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGFyYXNrYW53YXIzMCIsImEiOiJjanh2ZHg4MG4wM3oyM2xxaDg5Y2IzMThqIn0.KS-4Pa_K6YGdDDgcUi_FsQ&limit=1`;
  request({ url: Curl, json: true }, (error, response) => {
    if (error) callback("Can't connect To weather services", undefined);
    else if (!response.body.features[0])
      callback("Can't Find the location.try another Search", undefined);
    else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};

module.exports = geolocation;
