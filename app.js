//WEATHER 
const form = document.querySelector("#weatherSearch");
const temperature = document.querySelector(".temperature-value p");
const loc = document.querySelector(".location p");
const error = document.querySelector(".error");
const city = document.querySelector(".cityName");
const description = document.querySelector(".temperature-description p");
const weather = {};
weather.temperature = {
    unit: "celsius"
}
const kelvin = 273;
const keyWeather = "b8884a56f4cfafd0d7a008b90c88f098";
function getWeather() {
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${keyWeather}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - kelvin);
            weather.description = data.weather[0].description;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        })
        .then(function () {
            reset();
        })

        .catch(function () {
            error.innerText = "Please try another city";
            city.value = "";

            resetError();
        });
}

function displayWeather() {
    temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    description.innerHTML = weather.description;
    loc.innerHTML = `${weather.city}, ${weather.country}`;
}
function reset() {
    city.value = "";
    error.innerText = "";
}
function resetError() {
    temperature.innerHTML = '';
    description.innerHTML = '';
    loc.innerHTML = '';

}

function cToF(temperature) {
    return (temperature * 9 / 5) + 32;
}

temperature.addEventListener("click", function () {
    if (weather.temperature.value == undefined) {
        return "";
    }
    if (weather.temperature.unit == "celsius") {
        let fahrenheit = cToF(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        temperature.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else {
        temperature.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    getWeather();
})

// Dictionary
let form1 = document.querySelector(".dictSearch");
let def = document.querySelector(".definition")
let sound = document.querySelector(".audio")
let input = document.querySelector('.word');
const keyDict = "314077ce-cd25-4559-956c-2628c57c74c8";
async function getDict(word) {
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${keyDict}`);
    const data = await response.json();
    let definition = data[0].shortdef[0];
    def.innerText = definition;
    const soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName) {
            displaySound(soundName);
        }
       

}

function displaySound(soundName){
    let record = soundName.charAt(0);
    let soundShow   =`https://media.merriam-webster.com/soundc11/${record}/${soundName}.wav?key=${keyDict}` 
    let a = document.createElement('audio');
    a.src = soundShow;
    a.controls = true;
    sound.appendChild(a);
}

form1.addEventListener('submit',function(e){
    e.preventDefault();

    sound.innerHTML = '';
    def.innerText = '';

    let word= input.value;


    if (word.value === ""){
        alert('Not a valid word')
        return;
    }
    getDict(word);

})