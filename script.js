const apikey = "d7bd52518f5b76dcff7534d9b46a651c";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
 
const url = (location) => 
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

async function getWeatherByLocation(location) {
    const res = await fetch(url(location), {
        origin: "cors"
    });
    const resData = await res.json();
    addWeatherToPage(resData);
};

function addWeatherToPage(data) {
    const current_temp = ktoc(data.main.temp);
    const current_weather = data.weather[0].main;
    const city_name = data.name;

    const weather = document.createElement("div");
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2>${city_name}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
        <h1>${current_temp}°C</h1>
        <p>----------</p>
        <p>${current_weather}</p>
    `;

    main.innerHTML=" "

    main.appendChild(weather);
}

function ktoc(K) {
    return (K - 273.15).toFixed(2);
}

function getWeatherByClick() {
    const location = search.value;
    if (location) {
        getWeatherByLocation(location);
    }
}