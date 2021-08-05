//city user inputs
let city = document.querySelector('#city')
let searchbtn = document.querySelector('#searchbtn')
//previous cities looked up
let inputValue = document.querySelector('.inputValue')
//city user inputs shown and info
let currentCity = document.querySelector('#city-name')
// let currentDate = document.querySelector('#date')
let currentTemp = document.querySelector('#temperature')
let currentWind = document.querySelector('#wind')
let currentHumidity = document.querySelector('#humidity')
let currentUV = document.querySelector('#uvIndex')
let weatherIcon = document.querySelector('#icon')
//future 5 days
let dayOne = document.querySelector('.day1')
let dayTwo = document.querySelector('.day2')
let dayThree = document.querySelector('.day3')
let dayFour = document.querySelector('.day4')
let dayFive = document.querySelector('.day5')
let savedList= document.querySelector("#savedList");
//fetch
//pull info for city
//local storage to save previous cities

let apiKey = 'f35e006af25338731b8e7c0036ad0a11'

//current day time and date
var todaysDate = $("#date");
    date = null;

    var update = function () {
        date = moment(new Date())
        todaysDate.html(date.format('dddd, MMMM Do YYYY, h:mm a'));
    };
    
    $("#date").ready(function(){
        update();
        setInterval(update, 1000);
    }); 
         



    //missing UV Index ---> index must show favorable, moderate or severe 
searchBtn.onclick = function(e) {
     e.preventDefault()
      fetch('http://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=f35e006af25338731b8e7c0036ad0a11')
      
    .then(response => response.json())
    .then(data =>  {
    icon.innerHTML = ""
       
      var weatherIconUrl = "http://openweathermap.org/img/wn/" +
      data.weather[0].icon + ".png"
       
        var cityName = data["name"];
        var tempKelvin = data["main"]["temp"];
        //wtf is going on here
        var currentWind = data["wind"]["speed"]
        var humidityValue = data["main"]["humidity"];
        // var uvIndex = data["current"]["uvi"]
        //convert Kelvin into Celsius
        var tempCelsius = tempKelvin - 273;
        var tempFahrenheit = tempCelsius * (9/5) + 32;
        
        var Fahrenheit = Math.floor(tempFahrenheit)


        currentCity.innerHTML = cityName;
        currentTemp.innerHTML = 'Temp: ' + Fahrenheit + '°F';
        wind.innerHTML = 'Wind: ' + currentWind + 'mph';
        humidity.innerHTML = 'Humidity: ' + humidityValue + '%';
        // uv.innerHTML = "UV Index:" + uvIndex;
        var imageIcon = document.createElement('img')

        imageIcon.src= weatherIconUrl

        icon.append(imageIcon)
    
    })
}

    
    
       
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