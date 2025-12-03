const axios = require('axios');

const BASE_URL = 'http://localhost:5001/api';

async function runTests() {
    console.log('🚀 Starting Automated Test Suite...\n');
    let passed = 0;
    let failed = 0;

    async function test(name, fn) {
        try {
            process.stdout.write(`Testing ${name}... `);
            await fn();
            console.log('✅ PASS');
            passed++;
        } catch (error) {
            console.log('❌ FAIL');
            console.error(`   Error: ${error.message}`);
            if (error.response) {
                console.error(`   Status: ${error.response.status}`);
                console.error(`   Data: ${JSON.stringify(error.response.data)}`);
            }
            failed++;
        }
    }

    // Test 1: Health Check (if root exists, or just check weather)
    await test('Server Connectivity', async () => {
        // We don't have a root /api route, so let's check weather for a known city
        const res = await axios.get(`${BASE_URL}/weather?city=London`);
        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (!res.data.name) throw new Error('Response missing city name');
    });

    // Test 2: Invalid City (Now returns 200 with error field)
    await test('Invalid City Handling', async () => {
        const res = await axios.get(`${BASE_URL}/weather?city=Thotlavalluru`);
        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (!res.data.error || !res.data.notFound) throw new Error('Response missing error/notFound field');
    });

    // Test 3: Forecast
    await test('Forecast Fetching', async () => {
        const res = await axios.get(`${BASE_URL}/forecast?city=London`);
        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (!res.data.list) throw new Error('Response missing forecast list');
    });

    // Test 4: Air Quality
    await test('Air Quality Fetching', async () => {
        // London coordinates
        const res = await axios.get(`${BASE_URL}/air_quality?lat=51.5074&lon=-0.1278`);
        if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
        if (!res.data.list || !res.data.list[0].main.aqi) throw new Error('Response missing AQI data');
    });

    console.log(`\nTest Summary: ${passed} Passed, ${failed} Failed`);
    if (failed > 0) process.exit(1);
}

runTests();
