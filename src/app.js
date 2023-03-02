function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function sunDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();

  return days[day];
}
function sunDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `        <div class="col-2"><div class="weather-forecast-part">
             <div class="weather-forecast-day">${formatDay(
               forecastDay.dt
             )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }.png"
                  alt=""
                  width="55"
                />
                <div class="weather-forecast-temperature">
                  <span class="forecast-tempmax">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-tempmin">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div></div></div>              
                        
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");

  let descriptElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let tempmaxElement = document.querySelector("#temp-max");
  let tempminElement = document.querySelector("#temp-min");

  let dateElement = document.querySelector("#date");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = Math.round(response.data.main.temp);

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  sunriseElement.innerHTML = sunDate(response.data.sys.sunrise * 1000);
  sunsetElement.innerHTML = sunDate(response.data.sys.sunset * 1000);
  tempminElement.innerHTML = Math.round(response.data.main.temp_min);
  tempmaxElement.innerHTML = Math.round(response.data.main.temp_max);
  windspeedElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptElement.innerHTML = response.data.weather[0].description;
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function handlesubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function showCelsiusTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;
let form = document.querySelector("#cityform");
form.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("London");
