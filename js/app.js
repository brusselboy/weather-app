const API_KEY = '3265874a2c77ae4a04bb96236a642d2f';
const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

function url(location) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
}

getWeatherByLocation('Kansas');

async function getWeatherByLocation(location) {
    const resp = await fetch(url(location));
    const respData = await resp.json();
    console.log(respData)
    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = convertTempKtoC(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    main.innerHTML = '';
    weather.innerHTML = `
        <h1>${data.name}, ${data.sys.country}</h1>
        <hr class="hr__medium">
        <div class="detail__container">
            <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">${temp}°C</h2>
            <div clas="detail">
                <p>${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Visibility: ${String(data.visibility).slice(0,2)}km</p>
            </div>
        </div>
    `;

    main.appendChild(weather);
}

function convertTempKtoC(K) {
    return (K - 273.15).toFixed(0);
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm.trim() != '') {
        getWeatherByLocation(searchTerm);
        search.value = '';
    }
})