// Search city, and weather conditions:
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
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);

  celsiusTemperature = response.data.main.temp;
  //celsiusFeelsLike = response.data.main.feels_like;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = "318f9dfeb43dee4969a3fd201bd62795";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "318f9dfeb43dee4969a3fd201bd62795";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Search for current location:
//function getCurrentPosition(event) {
//  event.preventDefault();
//  navigator.geolocation.getCurrentPosition(showPosition);
//}

//let button = document.querySelector("button");
//button.addEventListener("click", getCurrentPosition);

// Return current time:
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

//change icons:
function changeIcon(response) {
 
  let icon = document.querySelector("#main-image");
  let iconName = response.data.weather[0].icon;
  let weatherInput = response.data.weather[0].description;
  let weatherInputMain = response.data.weather[0].main;
  if (iconName === "01n") {
    icon.setAttribute("src", "images/sun.png");
  } else if (weatherInputMain === "Clear") {
    icon.setAttribute("src", "images/sunnycloud.png");
  } else if (iconName === "09n" || iconName === "10n" || iconName === "10d") {
    icon.setAttribute("src", "images/rain.png");
  } else if (weatherInputMain === "Rain" || weatherInput === "shower rain") {
    icon.setAttribute("src", "images/cloudsun.png");
  } else if (weatherInput === "light rain") {
    icon.setAttribute("src", "images/sunnycloud.png");
  } else if (iconName === "02n" || iconName === "03n" || iconName === "04n") {
    icon.setAttribute("src", "images/cloudsun.png");
  } else if (
    (weatherInputMain === "Clouds" && weatherInput === "few clouds") ||
    weatherInput === "scattered clouds"
  ) {
    icon.setAttribute("src", "images/cloudy.png");
  } else if (weatherInputMain === "Clouds") {
    icon.setAttribute("src", "images/cloud.png");
  } else if (weatherInputMain === "Snow") {
    icon.setAttribute("src", "images/winter.png");
  } else if (weatherInputMain === "Haze") {
    icon.setAttribute("src", "images/cumulus.png");
  } else if (weatherInputMain === "Thunderstorm") {
    icon.setAttribute("src", "images/storm.png");
  } else {
    icon.setAttribute("src", "images/sun.png");
  }
}


// Swap between C and F:
function showTempFahrenheit(event) {
  event.preventDefault();
let temperatureElement = document.querySelector("#degrees");
//remove active class from celsius
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

//let fahrenheitFeelsLike = (celsiusFeelsLike * 9) / 5 + 32;
//fahrenheitFeelsLike = Math.round(fahrenheitFeelsLike);
}


function showTempCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#degrees");
temperatureElement.innerHTML = Math.round(celsiusTemperature);

//let celsiusFeelsLike = document.querySelector("feels-like");
//celsiusFeelsLike.innerHTML = Math.round(celsiusFeelsLike);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showTempFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showTempCelsius);

searchCity("Amsterdam");

