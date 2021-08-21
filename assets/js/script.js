//city user inputs
let city = document.querySelector("#city");
let searchBtn = document.querySelector("#searchBtn");
//previous cities looked up
let inputValue = document.querySelector(".inputValue");
//city user inputs shown and info
let currentCity = document.querySelector("#city-name");
// let currentDate = document.querySelector('#date')
let currentTemp = document.querySelector("#temperature");
let currentWind = document.querySelector("#wind");
let currentHumidity = document.querySelector("#humidity");
let currentUV = document.querySelector("#uv");
let weatherIcon = document.querySelector("#icon");
//future 5 days
let fivedayEl = document.querySelector(".five-day-boxes");
let dayOne = document.querySelector(".day1");
let dayTwo = document.querySelector(".day2");
let dayThree = document.querySelector(".day3");
let dayFour = document.querySelector(".day4");
let dayFive = document.querySelector(".day5");
let savedList = document.querySelector("#savedList");
let historyContainer = document.querySelector("#history");
let apiKey = "f35e006af25338731b8e7c0036ad0a11";
let searchHistory=[];

function renderHistory(){
  historyContainer.innerHTML = "";

  for (let i = searchHistory.length - 1; i>=0; i--) {
   var btn = document.createElement('button');
   btn.setAttribute('type', 'button');
   btn.classList.add('history-btn', 'btn-history');
   btn.setAttribute('data-search', searchHistory[i]);
   btn.textContent= searchHistory[i];
   historyContainer.append(btn);
  }
}

function addToHistory(city){
  searchHistory.push(city);
  //set-class object, use new syntax to create instance (takes values, unique/duplicates)
  searchHistory = [... new Set(searchHistory)];
  localStorage.setItem('search-history',JSON.stringify(searchHistory));
  renderHistory();
}

function startSearchHistory(){
  var storedHistory = localStorage.getItem('search-history');
  if (storedHistory){
    searchHistory= JSON.parse(storedHistory);
  }
  renderHistory();
}

function handleFormSubmit(event){

  if(!inputValue.value){
    return;
  }
  event.preventDefault();

  weatherSearch(inputValue.value.trim());
inputValue.value = '';
}

function HandleHistoryClick(e){
  var btn= e.target;
  var search = btn.getAttribute('data-search');
  weatherSearch(search);
}

function weatherSearch(inputVal){
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=f35e006af25338731b8e7c0036ad0a11")
    .then((response) => response.json() )
    .then((data) => {
      addToHistory(data.name)
      icon.innerHTML = "";
      const currentDate = new Date(data.dt * 1000);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      currentCity.innerHTML =
        data.name + " (" + month + "/" + day + "/" + year + ") ";

       
  
      var weatherIconUrl = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
      function yes() {
        // var cityName = data.name;
        var tempKelvin = data.main.temp;
        var currentWind = data.wind.speed;
        var humidityValue = data.main.humidity;
        // var uvIndex = data["current"]["uvi"]
        //convert Kelvin into Celsius
        var tempCelsius = tempKelvin - 273;
        var tempFahrenheit = tempCelsius * (9 / 5) + 32;
  
        var Fahrenheit = Math.floor(tempFahrenheit);
  
        // currentCity.innerHTML = cityName;
        currentTemp.innerHTML = "Temp: " + Fahrenheit + "°F";
        wind.innerHTML = "Wind: " + currentWind + "mph";
        humidity.innerHTML = "Humidity: " + humidityValue + "%";
        // uv.innerHTML = "UV Index:" + uvIndex;
        var imageIcon = document.createElement("img");
  
        imageIcon.src = weatherIconUrl;
  
        icon.append(imageIcon);
      }
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputVal + "&appid=f35e006af25338731b8e7c0036ad0a11")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          yes(data);
          console.log(data);
          let cityID = data.id;
          let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=f35e006af25338731b8e7c0036ad0a11";
          fetch(forecastQueryURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              const forecastEls = document.querySelectorAll(".forecast");
              for (i = 0; i < forecastEls.length; i++) {
                forecastEls[i].innerHTML = "";
  
                const forecastIndex = i * 8 + 4;
                const forecastDate = new Date(
                  data.list[forecastIndex].dt * 1000
                );
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML =
                  forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);
                // Icon for current weather
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt", data.list[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
  
                const forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + maths(data.list[forecastIndex].main.temp) + " &#176F";
                forecastEls[i].append(forecastTempEl);
  
                const forecastWindEl = document.createElement("p");
                forecastWindEl.innerHTML = "Wind: " + data.list[forecastIndex].wind.speed + " mph";
                forecastEls[i].append(forecastWindEl);
                
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
              }
            });
        });
    });

}
startSearchHistory();
searchBtn.addEventListener("click", function (event) {
 handleFormSubmit(event);
});

historyContainer.addEventListener('click',HandleHistoryClick);

function maths(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}