const apiKey = 'afa8445f5d26a615485846974596b181'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const cityNameElem = document.getElementById('cityName');
const temperatureElem = document.getElementById('temperature');
const descriptionElem = document.getElementById('description');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');
const pressureElem = document.getElementById('pressure');
const weatherIconElem = document.getElementById('weatherIcon');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;

    // Update UI with weather data
    cityNameElem.textContent = `Weather in ${name}`;
    temperatureElem.textContent = `Temperature: ${main.temp}°C`;
    descriptionElem.textContent = `Condition: ${weather[0].description}`;
    humidityElem.textContent = `Humidity: ${main.humidity}%`;
    windElem.textContent = `Wind Speed: ${wind.speed} m/s`;
    pressureElem.textContent = `Pressure: ${main.pressure} hPa`;
    weatherIconElem.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    // Adjust background based on weather
    const weatherCondition = weather[0].main.toLowerCase();
    document.body.style.background = getBackgroundForWeather(weatherCondition);

    weatherDisplay.classList.remove('hidden');
}

function getBackgroundForWeather(condition) {
    const weatherBackgrounds = {
        clear: 'linear-gradient(to bottom, #f7b733, #fc4a1a)',
        clouds: 'linear-gradient(to bottom, #d7d2cc, #304352)',
        rain: 'linear-gradient(to bottom, #4ca1af, #2c3e50)',
        thunderstorm: 'linear-gradient(to bottom, #141e30, #243b55)',
        snow: 'linear-gradient(to bottom, #e6dada, #274046)',
        default: 'linear-gradient(to bottom, #6dd5fa, #2980b9)',
    };
    return weatherBackgrounds[condition] || weatherBackgrounds.default;
}