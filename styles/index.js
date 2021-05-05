// Search city, current location, weather description
function searchPlace(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  let cityInput = document.querySelector(".form-control");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", searchPlace);

function displayWeatherCondition(response) {
   console.log(response.data);
  let cityElement = document.querySelector("#city-input");
  let description = document.querySelector("#temp-description");
  let temperatureElement = document.querySelector("#degrees");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "318f9dfeb43dee4969a3fd201bd62795";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "318f9dfeb43dee4969a3fd201bd62795";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

// Return current time
let now = new Date();

let day = now.getDay();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[now.getDay()];
let dateTime = document.querySelector("#date");
dateTime.innerHTML = `${currentDay} ${hours}:${minutes}`;

//change icon
function changeIcon(response) {
 
  let icon = document.querySelector("#imgWeather");
  let iconName = response.data.weather[0].icon;
  let weatherInput = response.data.weather[0].description;
  let weatherInputMain = response.data.weather[0].main;
  if (iconName === "01n") {
    icon.setAttribute("src", "imgs/sun.png");
  } else if (weatherInputMain === "Clear") {
    icon.setAttribute("src", "imgs/sunnycloud.png");
  } else if (iconName === "09n" || iconName === "10n") {
    icon.setAttribute("src", "imgs/rain.png");
  } else if (weatherInputMain === "Rain" || weatherInput === "shower rain") {
    icon.setAttribute("src", "imgs/cloudsun.png");
  } else if (weatherInput === "light rain") {
    icon.setAttribute("src", "imgs/sunnycloud.png");
  } else if (iconName === "02n" || iconName === "03n" || iconName === "04n") {
    icon.setAttribute("src", "imgs/cloudsun.png");
  } else if (
    (weatherInputMain === "Clouds" && weatherInput === "few clouds") ||
    weatherInput === "scattered clouds"
  ) {
    icon.setAttribute("src", "imgs/cloudy.png");
  } else if (weatherInputMain === "Clouds") {
    icon.setAttribute("src", "imgs/cloud.png");
  } else if (weatherInputMain === "Snow") {
    icon.setAttribute("src", "imgs/winter.png");
  } else if (weatherInputMain === "Haze") {
    icon.setAttribute("src", "imgs/cumulus.png");
  } else if (weatherInputMain === "Thunderstorm") {
    icon.setAttribute("src", "imgs/storm.png");
  } else {
    icon.setAttribute("src", "imgs/sun.png");
  }
}


// Swap between C and F

//function changeToFahrenheit(event) {
//  event.preventDefault();
//  let degrees = document.querySelector("#degrees");
//  degrees.innerHTML = Math.round((degrees.innerHTML * 9) / 5 + 32);
//}

//let fahrenheitLink = document.querySelector("#fahrenheit");
//fahrenheitLink.addEventListener("click", changeToFahrenheit);

//function convertToCelsius(event) {
//  event.preventDefault();
//  let temperatureElement = document.querySelector("#degrees");
//  temperatureElement.innerHTML = Math.round(
//    ((temperatureElement.innerHTML - 32) * 5) / 9
//  );
//}

//let celsiusLink = document.querySelector("#celsius");
//celsiusLink.addEventListener("click", convertToCelsius);
