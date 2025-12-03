const axios = require('axios');
const BASE_URL = 'http://localhost:5001/api/weather';

const testCaching = async () => {
    try {
        console.log('Testing Caching...');
        const city = 'London';

        // First call (Cache Miss)
        const start1 = Date.now();
        await axios.get(`${BASE_URL}?city=${city}`);
        const end1 = Date.now();
        console.log(`First call took ${end1 - start1}ms`);

        // Second call (Cache Hit)
        const start2 = Date.now();
        await axios.get(`${BASE_URL}?city=${city}`);
        const end2 = Date.now();
        console.log(`Second call took ${end2 - start2}ms`);

        if (end2 - start2 < end1 - start1) {
            console.log('✅ Caching seems to be working (second call was faster)');
        } else {
            console.log('⚠️ Caching might not be working or network is unstable');
        }
    } catch (error) {
        console.error('Test failed:', error.message);
    }
};

testCaching();
