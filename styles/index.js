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

//background change:
setInterval(change_background, 1000 * 60 * 2);

function change_background(){
let d = new Date();
let n = d.getHours();
console.log(n);
if (n == 22 || n < 7) {
  document.body.style.backgroundImage = "url(https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)";
} else if (n == 7 || n <13) {
  document.body.style.backgroundImage = "url(https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)";
}
else {
  document.body.style.backgroundImage = "url(https://images.pexels.com/photos/1673973/pexels-photo-1673973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)";
}
}

change_background();

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

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "318f9dfeb43dee4969a3fd201bd62795";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
   console.log(response.data);
  let cityElement = document.querySelector("#city-input");
  let countryElement = document.querySelector("#city-input");
  let description = document.querySelector("#temp-description");
  let temperatureElement = document.querySelector("#degrees");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#main-image");
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src",
    `images/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

    showPosition(response.data.coord);
}

function searchCity(city) {
  let apiKey = "318f9dfeb43dee4969a3fd201bd62795";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Search for current location:
//function getCurrentPosition(event) {
//  event.preventDefault();
//  navigator.geolocation.getCurrentPosition(showPosition);
//}

//let button = document.querySelector("button");
//button.addEventListener("click", getCurrentPosition);

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

