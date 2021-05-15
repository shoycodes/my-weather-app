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

//background-image change depending on time:
setInterval(change_background, 1000 * 60 * 2);

function change_background(){
let d = new Date();
let n = d.getHours();
console.log(n);
if (n >= 22 || n < 7) {
  document.body.style.backgroundImage = "url(https://images.pexels.com/photos/2341830/pexels-photo-2341830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)";
} else 
if (n == 7 || n <13) {
  document.body.style.backgroundImage = "url(https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)";
}
else {
  document.body.style.backgroundImage = "url(https://images.pexels.com/photos/1673973/pexels-photo-1673973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)";
}
}

change_background();

//5-day forecast:
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response){
  
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function(forecastDay, index) {
  if(index > 0 && index < 6) {

  forecastHTML =  
  forecastHTML + 
  ` 
        <div class="col-2 day">
            <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
            <div class="forecast-icon">
              <img src="images/${forecastDay.weather[0].icon}.png" alt="" width="50" />
            </div>
            <div class="forecast-temp">
              <span class="weather-forecast-temp-max"> ${Math.round(
            forecastDay.temp.max
          )} </span> |
          <span class="weather-forecast-temp-min"> ${Math.round(
            forecastDay.temp.min
          )} </span>
            </div>
          </div>
 `;
  }
  });
  
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "318f9dfeb43dee4969a3fd201bd62795";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

    getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "318f9dfeb43dee4969a3fd201bd62795";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
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

}

function showTempCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#degrees");
temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showTempFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showTempCelsius);

searchCity("Amsterdam");
