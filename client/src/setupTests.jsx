import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock ResizeObserver
window.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

// Mock HTMLCanvasElement.getContext (for Chart.js)
HTMLCanvasElement.prototype.getContext = () => {
    return {
        fillStyle: '',
        fillRect: vi.fn(),
        createLinearGradient: () => ({ addColorStop: vi.fn() }),
        measureText: () => ({ width: 0 }),
    };
};

// Mock LocalStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => {
            store[key] = value.toString();
        }),
        clear: vi.fn(() => {
            store = {};
        }),
        removeItem: vi.fn((key) => {
            delete store[key];
        }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock Geolocation
const mockGeolocation = {
    getCurrentPosition: vi.fn(),
    watchPosition: vi.fn(),
};
Object.defineProperty(window.navigator, 'geolocation', {
    value: mockGeolocation,
    writable: true
});

// Mock Axios
vi.mock('axios', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({
            data: {
                weather: [{ main: 'Clear' }],
                main: { temp: 20, humidity: 50 },
                wind: { speed: 5 },
                sys: { sunrise: 1000, sunset: 2000 },
                dt: 1500,
                name: 'Test City',
                coord: { lat: 0, lon: 0 },
                list: [] // For forecast
            }
        })),
        post: vi.fn(() => Promise.resolve({ data: {} })),
    },
}));

// Mock React-Leaflet
vi.mock('react-leaflet', () => ({
    MapContainer: ({ children }) => <div>{children}</div>,
    TileLayer: () => <div>TileLayer</div>,
    Marker: ({ children }) => <div>{children}</div>,
    Popup: ({ children }) => <div>{children}</div>,
    useMap: () => ({
        flyTo: vi.fn(),
    }),
}));
