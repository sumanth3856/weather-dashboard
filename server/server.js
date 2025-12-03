const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const NodeCache = require('node-cache');
const { fetchCurrentWeather, fetchForecast, fetchCitySuggestions, fetchAirQuality } = require('./weatherService');

dotenv.config();

const app = express();
const port = process.env.PORT || 5002;
const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Weather Dashboard API is running');
});

// Weather Route
app.get('/api/weather', async (req, res) => {
    const { city, lat, lon } = req.query;
    console.log('Incoming request query:', req.query);
    console.log('API Key loaded:', !!process.env.WEATHER_API_KEY);

    if (!city && (!lat || !lon)) {
        return res.status(400).json({ error: 'City or coordinates (lat, lon) are required' });
    }

    const cacheKey = city ? `weather_${city.toLowerCase()}` : `weather_${lat}_${lon}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log(`Cache hit for ${city || `${lat},${lon}`}`);
        return res.json(cachedData);
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        let data;
        if (city) {
            data = await fetchCurrentWeather(city, apiKey);
        } else {
            // Need to export/create a fetch by coords function
            // For now, let's update fetchCurrentWeather to handle both or create new one.
            // Let's assume fetchCurrentWeather can handle it if we modify it.
            // Actually, let's modify fetchCurrentWeather in weatherService.js
            data = await fetchCurrentWeather({ city, lat, lon }, apiKey);
        }

        cache.set(cacheKey, data);
        console.log(`Cache miss for ${city || `${lat},${lon}`}`);
        res.json(data);
    } catch (error) {
        const status = error.response?.status || 500;
        const errorMsg = error.response?.data?.message || error.message || 'Internal Server Error';
        console.error(`Error fetching weather: ${errorMsg}`);

        // Return 200 for 404s to avoid console errors on client
        if (status === 404) {
            return res.json({ error: 'City not found', notFound: true });
        }

        res.status(status).json({ error: errorMsg });
    }
});

// Forecast Route
app.get('/api/forecast', async (req, res) => {
    const { city, lat, lon } = req.query;
    if (!city && (!lat || !lon)) {
        return res.status(400).json({ error: 'City or coordinates (lat, lon) are required' });
    }

    const cacheKey = city ? `forecast_${city.toLowerCase()}` : `forecast_${lat}_${lon}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        console.log(`Cache hit for forecast ${city || `${lat},${lon}`}`);
        return res.json(cachedData);
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        // Pass object if lat/lon, or string if just city (though fetchForecast now handles object)
        // To be consistent with my change in weatherService, I can pass an object.
        const query = city ? { city } : { lat, lon };
        const data = await fetchForecast(query, apiKey);

        cache.set(cacheKey, data);
        console.log(`Cache miss for forecast ${city || `${lat},${lon}`}`);
        res.json(data);
    } catch (error) {
        const status = error.response?.status || 500;
        const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch forecast data';
        console.error(`Error fetching forecast: ${errorMsg}`);

        if (status === 404) {
            return res.json({ error: 'City not found', notFound: true });
        }

        res.status(status).json({ error: errorMsg });
    }
});

// Search Suggestions Route
app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    const cacheKey = `search_${query.toLowerCase()}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const data = await fetchCitySuggestions(query, apiKey);

        cache.set(cacheKey, data);
        res.json(data);
    } catch (error) {
        const status = error.response?.status || 500;
        const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch search suggestions';
        console.error(`Error fetching suggestions: ${errorMsg}`);
        res.status(status).json({ error: errorMsg });
    }
});

// Air Quality Route
app.get('/api/air_quality', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const airQuality = await fetchAirQuality(lat, lon, apiKey);
        res.json(airQuality);
    } catch (error) {
        const status = error.response?.status || 500;
        const errorMsg = error.response?.data?.message || error.message || 'Failed to fetch air quality data';
        console.error(`Error fetching air quality: ${errorMsg}`);
        res.status(status).json({ error: errorMsg });
    }
});

app.listen(port, () => {
    console.log(`Server v2 running on port ${port}`);
});
