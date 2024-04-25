
let weatherBox = document.querySelector(".weather");
let dailyWeather = document.querySelector(".daily-weather")
const search = document.querySelector("#search-icon");
let inputValue = document.getElementById("inputValue")
console.log("salam")
const key = "573557fda6ecf279a6b916f938d25856";

inputValue.addEventListener("keypress", press);

function press(e) {
    console.log(e.keyCode)
    if (e.keyCode == "13") {

        weatherBox.style.display = "block"
        dailyWeather.style.display = "block"

        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${key}&units=metric&lang=en,tr,az,ru`, true);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                console.log(response);
                update(response);

            }

            else if (this.readyState == 4 && this.status != 200) {
                alert("doru yazsana appi")
            }
        }
        xhttp.send();
    }

}

search.addEventListener("click", function () {

    weatherBox.style.display = "block"
    dailyWeather.style.display = "block"


    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${key}&units=metric&lang=en,tr,az,ru`, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            console.log(response);
            update(response);


        }

        else if (this.readyState == 4 && this.status != 200) {
            alert("doru yazsana appi")
        }


    }
    xhttp.send();
})


function update(weatherData) {

    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = `${Math.round(weatherData.main.temp)} °C`

    let cityName = document.querySelector("#cityName");
    cityName.innerHTML = `${weatherData.name}`

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${weatherData.main.humidity} %`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${weatherData.wind.speed} Km/h`;

    let iconUrl = "http://openweathermap.org/img/wn/"
    let iconWeather = `${iconUrl}${weatherData.weather[0].icon}@2x.png`;
    document.querySelector(".weather-icon").innerHTML = `<img src="${iconWeather}" alt="Weather Icon">`;

    let mobileIcon="http://openweathermap.org/img/wn/"
    let mobileIconWeather = `${mobileIcon}${weatherData.weather[0].icon}@2x.png`;
    document.querySelector(".weather-icon-mobile").innerHTML = `<img src="${mobileIconWeather}" alt="Weather Icon">`;


    // let code=document.querySelector(".weekend");
    // code.innerHTML=`${weatherData.coord.lon}`;

    // let codeLat=document.querySelector("#temperature-daily");
    // codeLat.innerHTML=`${weatherData.coord.lat}`

    let hours = document.querySelector(".hours");
    let minutes = document.querySelector(".minutes");

    let time = `${weatherData.timezone}`;

    let currentDate = new Date();
    let date = new Date(currentDate.getTime() + (time * 1000))
    let citiesHours = String(date.getUTCHours()).padStart(2, '0');
    let citiesMinutes = String(date.getUTCMinutes()).padStart(2, '0');
    hours.innerHTML = citiesHours;
    minutes.innerHTML = citiesMinutes;

}



