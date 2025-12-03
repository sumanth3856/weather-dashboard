const axios = require('axios');

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchCurrentWeather = async (query, apiKey) => {
    let url;
    if (typeof query === 'string') {
        url = `${BASE_URL}/weather?q=${query}&units=metric&appid=${apiKey}`;
    } else if (query.city) {
        url = `${BASE_URL}/weather?q=${query.city}&units=metric&appid=${apiKey}`;
    } else if (query.lat && query.lon) {
        url = `${BASE_URL}/weather?lat=${query.lat}&lon=${query.lon}&units=metric&appid=${apiKey}`;
    }

    const response = await axios.get(url);
    return response.data;
};

const fetchForecast = async (query, apiKey) => {
    // OpenWeatherMap 5 day / 3 hour forecast
    let url;
    if (typeof query === 'string') {
        url = `${BASE_URL}/forecast?q=${query}&units=metric&appid=${apiKey}`;
    } else if (query.city) {
        url = `${BASE_URL}/forecast?q=${query.city}&units=metric&appid=${apiKey}`;
    } else if (query.lat && query.lon) {
        url = `${BASE_URL}/forecast?lat=${query.lat}&lon=${query.lon}&units=metric&appid=${apiKey}`;
    }

    const response = await axios.get(url);
    return response.data;
};

const fetchCitySuggestions = async (query, apiKey) => {
    // OpenWeatherMap Geocoding API
    // Limit to 5 results
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
};

const fetchAirQuality = async (lat, lon, apiKey) => {
    // OpenWeatherMap Air Pollution API
    const url = `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);
    return response.data;
};

module.exports = {
    fetchCurrentWeather,
    fetchForecast,
    fetchCitySuggestions,
    fetchAirQuality,
};
