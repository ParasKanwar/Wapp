const request = require("request");
const TokenUrl =
  "https://api.darksky.net/forecast/1301187e8510188ce3cb6497fd69a1f2/";
const forecast = (latitude, longitude, callback) => {
  request(
    { uri: TokenUrl + latitude + "," + longitude + "?units=si", json: true },
    (error, response) => {
      if (error) callback("Can't Connect to Weather Services");
      else if (response.body.error) callback(response.body.error);
      else callback(undefined, response);
    }
  );
};
module.exports = forecast;
