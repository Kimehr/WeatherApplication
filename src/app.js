function displayTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let tempmaxElement = document.querySelector("#temp-max");
  let tempminElement = document.querySelector("#temp-min");
  tempminElement.innerHTML = Math.round(response.data.main.temp_min);
  tempmaxElement.innerHTML = Math.round(response.data.main.temp_max);
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  console.log(response);
}

let apiKey = "4b3503b2f08a729413c4d33ef1186004";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
