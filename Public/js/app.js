//selecting form element
const form = document.querySelector("form");
//selecting input element in order to access value of user search query
const search = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
form.addEventListener("submit", e => {
  e.preventDefault();
  const location1 = search.value;
  message1.textContent = "Loading...";
  message2.textContent = "";
  fetch(`/weather?address=${location1}`).then(data => {
    data.json().then(data => {
      if (data.error) message1.textContent = data.error;
      else {
        message1.textContent = ` (${data.Location}) `;
        message2.textContent = `Current Temperature is ${
          data.weather_details.temperature
        }*C And There is ${data.weather_details.precipProbability *
          100}% Chances Of Raining.`;
      }
    });
  });
});
