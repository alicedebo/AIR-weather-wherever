//city user inputs
let city = document.querySelector('#city');
let searchBtn = document.querySelector('#searchBtn');
//previous cities looked up
let inputValue = document.querySelector('.inputValue');
//city user inputs shown and info
let currentCity = document.querySelector('#city-name');
// let currentDate = document.querySelector('#date')
let currentTemp = document.querySelector('#temperature');
let currentWind = document.querySelector('#wind');
let currentHumidity = document.querySelector('#humidity');
let currentUV = document.querySelector('#uvIndex');
let weatherIcon = document.querySelector('#icon');
//future 5 days
let fivedayEl = document.querySelector('.five-day-boxes');
let dayOne = document.querySelector('.day1');
let dayTwo = document.querySelector('.day2');
let dayThree = document.querySelector('.day3');
let dayFour = document.querySelector('.day4');
let dayFive = document.querySelector('.day5');
let savedList= document.querySelector("#savedList");
//fetch
//pull info for city
//local storage to save previous cities

let apiKey = 'f35e006af25338731b8e7c0036ad0a11';

//current day time and date
// var todaysDate = $("#date");
//     date = null;

//     var update = function () {
//         date = moment(new Date());
//         todaysDate.html(date.format('dddd, MMMM Do YYYY, h:mm a'));
//     };
    
//     $("#date").ready(function(){
//         update();
//         setInterval(update, 1000);
//     }); 
         

    

// var weatherUrl = ('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=f35e006af25338731b8e7c0036ad0a11');
    //missing UV Index ---> index must show favorable, moderate or severe 
// searchBtn.onclick = function(e) {
    searchBtn.addEventListener("click", function(event) {
      event.preventDefault();  
      fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=f35e006af25338731b8e7c0036ad0a11')
      
        .then(response => response.json())
        .then(data =>  {
        icon.innerHTML = "";
        const currentDate = new Date(data.dt*1000);
            console.log(currentDate);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            currentCity.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";
       
      var weatherIconUrl = "http://openweathermap.org/img/wn/" +
      data.weather[0].icon + ".png";
       function yes() {
        // var cityName = data.name;
        var tempKelvin = data.main.temp;
        //wtf is going on here
        var currentWind = data.wind.speed;
        var humidityValue = data.main.humidity;
        // var uvIndex = data["current"]["uvi"]
        //convert Kelvin into Celsius
        var tempCelsius = tempKelvin - 273;
        var tempFahrenheit = tempCelsius * (9/5) + 32;
        
        var Fahrenheit = Math.floor(tempFahrenheit);


        // currentCity.innerHTML = cityName;
        currentTemp.innerHTML = 'Temp: ' + Fahrenheit + '°F';
        wind.innerHTML = 'Wind: ' + currentWind + 'mph';
        humidity.innerHTML = 'Humidity: ' + humidityValue + '%';
        // uv.innerHTML = "UV Index:" + uvIndex;
        var imageIcon = document.createElement('img');

        imageIcon.src= weatherIconUrl;

        icon.append(imageIcon);
    
    }
     fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=f35e006af25338731b8e7c0036ad0a11')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        yes(data);
        console.log(data);


    // searchbtn.addEventListener("onclick", todaysWeather);
       
// var getUvIndex = function () {
//     var apiURL = `http://api.openweathermap.org/geo/1.0/zip?zip=E14,GB&appid={$apiKey}`
//     fetch(apiURL)
//         .then(function (response) {
//             response.json().then(function (data) {
//                 displayUvIndex(data)
//                 console.log(data)
//             });
            
//          });   
//         var lat = data["coord"]["lat"];
//         var lon = data["coord"]["long"];
//     // console.log(lat);
//     // console.log(lon);
//     let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
//     fetch(UVQueryURL)
//     .then(function (response) {
//         response.json().then(function (data) {
//             displayUvIndex(data)
//         });
//     });
// }
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
            const forecastDate = new Date(data.list[forecastIndex].dt * 1000);
            console.log(forecastDate);
          
            const forecastDay = forecastDate.getDate();
            const forecastMonth = forecastDate.getMonth() + 1;
            const forecastYear = forecastDate.getFullYear();
            const forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
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
            forecastWindEl.innerHTML = "Wind: " + (data.list[forecastIndex].wind.speed) + " mph";
            forecastEls[i].append(forecastWindEl);
            const forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastEls[i].append(forecastHumidityEl);
         } 
        });
    }); 
    // fivedayEl.classList.remove("d-none");
        //  Parse response to display forecast for next 5 days
       
     
  
    
    });
});

function maths(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}

// var displayUvIndex = function (index) {
//     var uvIndexEl = document.createElement("div");
//     uvIndexEl.textContent = "UV Index: "
//     uvIndexEl.classList = "uv"

//     uvIndexValue = document.createElement("span")
//     uvIndexValue.textContent = index.value

//     if (index.value <= 2) {
//         uvIndexValue.classList = "favorable"
//     } else if (index.value > 2 && index.value <= 8) {
//         uvIndexValue.classList = "moderate "
//     }
//     else if (index.value > 8) {
//         uvIndexValue.classList = "severe"
//     };

//     uvIndexEl.appendChild(uvIndexValue);

//     //append index to current weather
//     weatherContainerEl.appendChild(uvIndexEl);
// }