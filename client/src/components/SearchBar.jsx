import React from 'react';
import { Search, MapPin, Loader2, LocateFixed } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [locating, setLocating] = useState(false);
    const wrapperRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target))
                setShowSuggestions(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = async (query) => {
        if (!query) { setSuggestions([]); return; }
        try {
            const res = await axios.get(`http://localhost:5001/api/search?query=${query}`);
            setSuggestions(res.data);
            setShowSuggestions(true);
        } catch { /* silently ignore */ }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCity(value);
        clearTimeout(debounceTimeout.current);
        if (value.length > 2) {
            debounceTimeout.current = setTimeout(() => fetchSuggestions(value), 300);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (s) => {
        setCity(s.name);
        onSearch(s.name);
        setShowSuggestions(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) { onSearch(city); setShowSuggestions(false); }
    };

    const handleLocationClick = async () => {
        setLocating(true);
        await onSearch({ useLocation: true });
        setLocating(false);
    };

    return (
        <div ref={wrapperRef} className="relative w-full md:w-96 z-50">
            <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-white dark:bg-[#121214] border border-zinc-200 dark:border-white/8 rounded-xl shadow-sm transition-all duration-200 focus-within:border-accent dark:focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20"
            >
                {/* Search icon */}
                <div className="pl-3.5 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-slate-400 group-focus-within:text-accent transition-colors duration-200" strokeWidth={2} />
                </div>

                {/* Input */}
                <input
                    type="text"
                    name="city"
                    id="city-search"
                    placeholder="Search city..."
                    value={city}
                    onChange={handleInputChange}
                    onFocus={() => city.length > 2 && setShowSuggestions(true)}
                    className="flex-1 pl-2.5 pr-2 py-2.5 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
                />

                {/* Divider */}
                <div className="w-px h-5 bg-zinc-200 dark:bg-white/8 mx-1 flex-shrink-0" />

                {/* Location button */}
                <button
                    type="button"
                    onClick={handleLocationClick}
                    disabled={locating}
                    title="Use current location"
                    className={`
                        mr-1.5 flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0
                        border transition-all duration-200
                        ${locating
                            ? 'text-accent border-accent/30 bg-accent/5 cursor-not-allowed'
                            : 'text-slate-400 dark:text-slate-500 border-zinc-200 dark:border-white/8 hover:text-accent hover:border-accent/40 hover:bg-accent/5'
                        }
                    `}
                >
                    {locating
                        ? <Loader2 className="w-3.5 h-3.5 animate-spin" strokeWidth={2} />
                        : <LocateFixed className="w-3.5 h-3.5" strokeWidth={2} />
                    }
                </button>
            </form>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-white/8 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto animate-fade-in z-[100]">
                    {suggestions.map((s, i) => (
                        <li
                            key={i}
                            onClick={() => handleSuggestionClick(s)}
                            className="flex items-center gap-3 px-3.5 py-2.5 cursor-pointer border-b border-zinc-100 dark:border-white/5 last:border-none hover:bg-zinc-50 dark:hover:bg-white/4 transition-colors group"
                        >
                            {/* Pin icon */}
                            <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-accent/20 group-hover:bg-accent/5 transition-colors">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-accent transition-colors" strokeWidth={2} />
                            </div>
                            <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 flex-1 truncate">
                                {s.name}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-600 font-medium flex-shrink-0">
                                {s.state ? `${s.state}, ` : ''}{s.country}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
