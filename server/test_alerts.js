const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.WEATHER_API_KEY;
const lat = 40.7128; // New York
const lon = -74.0060;

async function testOneCall() {
    try {
        console.log('Testing One Call API 3.0...');
        const url3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${apiKey}`;
        const res3 = await axios.get(url3);
        console.log('One Call 3.0 Success:', !!res3.data.alerts);
        if (res3.data.alerts) console.log('Alerts found:', res3.data.alerts);
    } catch (error) {
        console.error('One Call 3.0 Failed:', error.response?.status, error.response?.data?.message);

        try {
            console.log('Testing One Call API 2.5...');
            const url25 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${apiKey}`;
            const res25 = await axios.get(url25);
            console.log('One Call 2.5 Success:', !!res25.data.alerts);
            if (res25.data.alerts) console.log('Alerts found:', res25.data.alerts);
        } catch (error2) {
            console.error('One Call 2.5 Failed:', error2.response?.status, error2.response?.data?.message);
        }
    }
}

testOneCall();
