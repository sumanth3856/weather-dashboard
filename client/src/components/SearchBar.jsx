import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }
        try {
            const res = await axios.get(`http://localhost:5001/api/search?query=${query}`);
            setSuggestions(res.data);
            setShowSuggestions(true);
        } catch (err) {
            console.error('Failed to fetch suggestions', err);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCity(value);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        if (value.length > 2) {
            debounceTimeout.current = setTimeout(() => {
                fetchSuggestions(value);
            }, 300);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        const cityName = suggestion.name;
        setCity(cityName);
        onSearch(cityName);
        setShowSuggestions(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setShowSuggestions(false);
        }
    };

    return (
        <div ref={wrapperRef} className="relative w-full md:w-96 z-50">
            <form onSubmit={handleSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400">🔍</span>
                </div>
                <input
                    type="text"
                    name="city"
                    id="city-search"
                    placeholder="Search city..."
                    value={city}
                    onChange={handleInputChange}
                    onFocus={() => city.length > 2 && setShowSuggestions(true)}
                    className="w-full pl-10 pr-12 py-3 bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-lg"
                />
                <button
                    type="button"
                    onClick={() => onSearch({ useLocation: true })}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                    title="Use current location"
                >
                    📍
                </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute w-full mt-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto animate-fade-in">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-3 text-slate-200 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/5 last:border-none flex items-center gap-2"
                        >
                            <span className="opacity-50 text-xs">📍</span>
                            <span>{suggestion.name}</span>
                            <span className="text-xs opacity-50 ml-auto">{suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
