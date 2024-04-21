// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value h4");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location h3");
const humidityElement = document.querySelector(".humidity-value p");
const windElement = document.querySelector(".windspeed-value p");
const atmElement = document.querySelector(".atm-value p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
  unit: "celsius",
};

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "1409a191044fa110fd667e27fdc7da00";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.atm = data.main.pressure;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
    })
    .then(function () {
      displayWeather();
    });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
  //iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  humidityElement.innerHTML = `${weather.humidity}%`;
  atmElement.innerHTML = `${weather.atm}Pa`;
  windElement.innerHTML = `${weather.wind}km/h`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = "celsius";
  }
});

//  FUNCTION TO GET WEATHER BY USER INPUT
function getWeatherByInput(city, country) {
  let api = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
      weather.atm = data.main.pressure;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
    })
    .then(function () {
      displayWeather();
    });
}

// ADD EVENT LISTENER TO BUTTON FOR GETTING WEATHER BY USER INPUT
const getWeatherButton = document.querySelector(".search-button");
getWeatherButton.addEventListener("click", function () {
  const cityInput = document.querySelector(".search-input");

  getWeatherByInput(cityInput.value);
});
