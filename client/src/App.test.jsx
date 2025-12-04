import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock ResizeObserver
beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});

// Mock Axios
vi.mock('axios', () => ({
    default: {
        get: vi.fn((url) => {
            if (url.includes('forecast')) {
                return Promise.resolve({
                    data: {
                        list: Array(5).fill({
                            dt: 1600000000,
                            dt_txt: '2020-01-01 12:00:00',
                            main: { temp: 20 },
                            weather: [{ icon: '01d', description: 'clear', main: 'Clear' }]
                        }),
                        city: { name: 'Test City' }
                    }
                });
            }
            if (url.includes('air_quality')) {
                return Promise.resolve({
                    data: {
                        list: [{ main: { aqi: 1 }, components: { co: 200, no2: 10, o3: 50, pm2_5: 10 } }]
                    }
                });
            }
            // Default to current weather
            return Promise.resolve({
                data: {
                    name: 'Test City',
                    sys: { country: 'TC' },
                    weather: [{ description: 'clear sky', icon: '01d', main: 'Clear' }],
                    main: { temp: 25, feels_like: 27, humidity: 50, pressure: 1010 },
                    wind: { speed: 5 },
                    visibility: 10000,
                    coord: { lat: 0, lon: 0 }
                }
            });
        }),
    },
}));

// Mock Three.js/Canvas
vi.mock('@react-three/fiber', () => ({
    ...vi.importActual('@react-three/fiber'),
    Canvas: ({ children }) => <div>{children}</div>,
}));

// Mock WeatherScene to avoid complex 3D logic
vi.mock('./components/WeatherScene', () => ({
    default: () => <div>Weather Scene</div>,
}));

describe('App Component', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Check for the main title
        expect(screen.getByText(/Weather/i)).toBeInTheDocument();
        expect(screen.getByText(/Bun/i)).toBeInTheDocument();
    });
});
