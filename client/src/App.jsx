import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastChart from './components/ForecastChart';
import WeatherMap from './components/WeatherMap';
import DailyForecast from './components/DailyForecast';
import UnitToggle from './components/UnitToggle';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import WeatherScene from './components/WeatherScene';


import ErrorDisplay from './components/ErrorDisplay';
import Analytics from './components/Analytics';
import FullMapView from './components/FullMapView';
import Settings from './components/Settings';

import AirQualityCard from './components/AirQualityCard';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weather_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('weather_theme');
    return saved || 'dark';
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    localStorage.setItem('weather_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('weather_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleFavorite = (city) => {
    setFavorites(prev => {
      if (prev.includes(city)) {
        return prev.filter(c => c !== city);
      }
      return [...prev, city];
    });
  };

  const removeFavorite = (city) => {
    setFavorites(prev => prev.filter(c => c !== city));
  };

  const handleFavoriteSelect = (city) => {
    handleSearch(city);
    setCurrentView('dashboard');
  };

  const fetchWeatherData = async (query) => {
    setLoading(true);
    setError(null);
    try {
      let url = `/api/weather`;
      if (typeof query === 'string') {
        url += `?city=${query}`;
      } else if (typeof query === 'object' && query.lat && query.lon) {
        url += `?lat=${query.lat}&lon=${query.lon}`;
      }

      const weatherRes = await axios.get(url);

      if (weatherRes.data.notFound || weatherRes.data.error) {
        setError('City not found. Please try another location.');
        setWeather(null);
        setForecast(null);
        return;
      }

      setWeather(weatherRes.data);

      // Fetch AQI using coordinates from weather data
      const { coord } = weatherRes.data;
      if (coord) {
        try {
          const aqiRes = await axios.get(`/api/air_quality?lat=${coord.lat}&lon=${coord.lon}`);
          setAqi(aqiRes.data);
        } catch (aqiErr) {
          console.error('Failed to fetch AQI', aqiErr);
          setAqi(null);
        }
      }

      // For forecast, we need the city name from the weather response if we searched by coords,
      // OR we can pass coords to forecast endpoint too.
      // Let's pass coords to forecast endpoint if available.
      let forecastUrl = `/api/forecast`;
      if (typeof query === 'string') {
        forecastUrl += `?city=${query}`;
      } else if (typeof query === 'object' && query.lat && query.lon) {
        forecastUrl += `?lat=${query.lat}&lon=${query.lon}`;
      }

      const forecastRes = await axios.get(forecastUrl);

      if (forecastRes.data.notFound || forecastRes.data.error) {
        // If forecast fails but weather succeeded, we might still show weather, 
        // but for consistency let's just show the error or handle it quietly.
        // Let's just set forecast to null.
        setForecast(null);
      } else {
        setForecast(forecastRes.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('City not found. Please try another location.');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch data');
      }
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (query && query.useLocation) {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData({ lat: latitude, lon: longitude });
        }, (err) => {
          console.error(err);
          setError('Location access denied or unavailable.');
          setLoading(false);
        });
      } else {
        setError('Geolocation is not supported by your browser.');
      }
    } else {
      fetchWeatherData(query);
    }
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        // Fetch weather by coordinates (requires backend update or reverse geocoding)
        // For now, we'll use a reverse geocoding lookup or just search by lat/lon if API supports it.
        // Since our backend expects 'city', we can try to pass 'lat,lon' string if OWM supports it, 
        // OR update backend to handle coords.
        // OWM 'q' parameter is for city name. We need to use 'lat' and 'lon' params.
        // Let's update fetchWeatherData to handle this.
        fetchWeatherData({ lat: latitude, lon: longitude });
      }, (err) => {
        console.error(err);
        fetchWeatherData('London');
      });
    } else {
      fetchWeatherData('London');
    }
  }, []);

  // Bind Day/Night scene directly to the theme to ensure Dark Mode always shows the Night Sky
  const isDay = theme === 'light';

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-transparent text-slate-900 dark:text-slate-100 flex relative overflow-hidden transition-colors duration-300">
      {/* 3D Background */}
      <WeatherScene weatherCondition={weather?.weather?.[0]?.main} isDay={isDay} />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex pointer-events-none">
        <div className="pointer-events-auto h-full">
          <Sidebar currentView={currentView} onNavigate={setCurrentView} />
          <MobileNav currentView={currentView} onNavigate={setCurrentView} />
        </div>

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto h-screen pointer-events-auto w-full">
          <div className="max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-light tracking-tight text-slate-900 dark:text-white">Weather<span className="font-bold">Bun</span></h1>
                <p className="text-slate-700 dark:text-slate-400 text-sm font-light"> immersive weather experience</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto z-50">
                <SearchBar onSearch={handleSearch} />
                <UnitToggle unit={unit} onToggle={toggleUnit} />
              </div>
            </header>

            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/20"></div>
              </div>
            )}

            {error && (
              <div className="flex justify-center mb-8">
                <ErrorDisplay
                  message={error}
                  onRetry={() => handleSearch({ useLocation: true })}
                />
              </div>
            )}

            {!loading && (
              <>
                {currentView === 'dashboard' && weather && (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                      <div className="lg:col-span-2 space-y-6">
                        <CurrentWeather
                          data={weather}
                          unit={unit}
                          isFavorite={favorites.includes(weather.name)}
                          onToggleFavorite={() => toggleFavorite(weather.name)}
                        />
                        <DailyForecast data={forecast} unit={unit} />
                        <ForecastChart data={forecast} unit={unit} />
                      </div>
                      <div className="space-y-6">
                        <AirQualityCard data={aqi} />
                        <WeatherMap coord={weather.coord} />
                      </div>
                    </div>
                  </>
                )}

                {currentView === 'favorites' && (
                  <Favorites
                    favorites={favorites}
                    onSelect={handleFavoriteSelect}
                    onRemove={removeFavorite}
                  />
                )}

                {currentView === 'map' && weather && <FullMapView coord={weather?.coord} city={weather?.name} />}

                {currentView === 'settings' && (
                  <Settings
                    unit={unit}
                    onToggleUnit={toggleUnit}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                  />
                )}

                {currentView === 'analytics' && weather && (
                  <Analytics data={forecast} unit={unit} />
                )}

                {/* Fallback for unknown views */}
                {!['dashboard', 'favorites', 'map', 'settings', 'analytics'].includes(currentView) && (
                  <NotFound onHome={() => setCurrentView('dashboard')} />
                )}
              </>
            )}

            {/* Mobile Trademark */}
            <div className="md:hidden mt-12 pb-6 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-500 font-medium">
                Developed by <span className="text-slate-800 dark:text-slate-300">Sumanth, ALIET</span>
              </p>
            </div>
          </div>
        </main>
      </div >
    </div >
  );
}

export default App;
