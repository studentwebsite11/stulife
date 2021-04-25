const form = document.querySelector("#weatherSearch");

const temperature = document.querySelector(".temperature-value p");

const loc = document.querySelector(".location p");

const city = document.querySelector(".cityName");

const description = document.querySelector(".temperature-description p");

const weather = {};

weather.temperature = {
    unit : "celsius"
}

const kelvin = 273;
const key = "b8884a56f4cfafd0d7a008b90c88f098";



function getWeather(){
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    description.innerHTML = weather.description;
    loc.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
temperature.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        temperature.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    getWeather();
})


