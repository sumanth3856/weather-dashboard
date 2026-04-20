import React, { useState, useEffect } from 'react';
import { Star, Droplets, Wind, Gauge, Eye } from 'lucide-react';
import useCountUp from '../hooks/useCountUp';
import WeatherScene from './WeatherScene';

const CurrentWeather = ({ data, unit, isFavorite, onToggleFavorite }) => {
    if (!data) return null;

    const { name, main, weather, wind, visibility, sys } = data;
    const tempRaw = unit === 'metric' ? Math.round(main.temp) : Math.round(main.temp * 9 / 5 + 32);
    const feelsLikeRaw = unit === 'metric' ? Math.round(main.feels_like) : Math.round(main.feels_like * 9 / 5 + 32);
    const temp = useCountUp(tempRaw);
    const feelsLike = useCountUp(feelsLikeRaw);
    const unitSymbol = unit === 'metric' ? '°C' : '°F';

    const conditionId = weather[0].id;
    const iconCode = weather[0].icon;
    const isDay = iconCode.endsWith('d');
    const tempC = unit === 'metric' ? main.temp : (main.temp - 32) * 5 / 9;

    // Live clock — ticks every second
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);

    const clockDate = now.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    const clockTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });

    // All weather scenes use white overlaid text (sky is always colored)
    const needsWhiteText = true;
    const textPrimary  = 'text-white';
    const textMuted    = 'text-white/65';

    return (
        <div className="relative overflow-hidden rounded-2xl min-h-[360px] sm:min-h-[340px] shadow-lg"
            style={{ isolation: 'isolate' }}>

            {/* ── Animated Weather Scene ── */}
            <WeatherScene conditionId={conditionId} iconCode={iconCode} tempC={tempC} />

            {/* ── Dark gradient overlay so text always reads clean ── */}
            <div className="absolute inset-0 z-[1]"
                style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.55) 100%)' }}
            />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col h-full p-5 sm:p-7 min-h-[360px] sm:min-h-[340px]">

                {/* Top row — location name only, no badge clutter */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className={`text-xl sm:text-2xl font-bold ${textPrimary} drop-shadow`}>
                            {name}
                            <span className="font-normal opacity-60 ml-1.5 text-lg">{sys.country}</span>
                        </h2>
                        <p className={`${textMuted} text-sm mt-0.5 capitalize font-medium drop-shadow-sm`}>
                            {weather[0].description}
                        </p>
                        {/* Live clock */}
                        <p className="text-white/50 text-[11px] font-medium mt-1.5 tabular-nums tracking-wide drop-shadow-sm">
                            {clockDate} &middot; {clockTime}
                        </p>
                    </div>
                    {/* Star only — no LIVE badge here, moved to footer */}
                    <button
                        onClick={onToggleFavorite}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-sm
                            ${isFavorite
                                ? 'bg-amber-400/90 text-amber-900'
                                : 'bg-black/20 text-white/70 hover:bg-black/30 hover:text-amber-300 border border-white/15'
                            }`}
                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Star className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
                    </button>
                </div>

                {/* Temperature hero — centred in the scene */}
                <div className="flex items-center gap-2 sm:gap-4 mt-auto mb-auto pt-6 pb-2">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                        alt={weather[0].description}
                        className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-xl -ml-2"
                    />
                    <div>
                        <div className={`text-6xl sm:text-7xl font-extrabold ${textPrimary} tracking-tighter drop-shadow-lg leading-none`}>
                            {temp}
                            <span className="text-2xl sm:text-3xl font-semibold align-super ml-0.5 opacity-80">{unitSymbol}</span>
                        </div>
                        <p className={`${textMuted} text-sm mt-1.5 font-medium drop-shadow-sm`}>
                            Feels like {feelsLike}{unitSymbol}
                        </p>
                    </div>
                </div>

                {/* ── Bottom strip: stats + LIVE badge ── */}
                <div className="mt-auto">
                    {/* Frosted glass divider */}
                    <div className="w-full h-px bg-white/20 mb-3" />
                    <div className="flex items-center justify-between gap-2">
                        {/* Stats inline */}
                        <div className="flex gap-4 sm:gap-6 flex-wrap">
                            <StatChip icon={Droplets} value={`${main.humidity}%`}               label="Humidity" />
                            <StatChip icon={Wind}     value={`${wind.speed} m/s`}              label="Wind" />
                            <StatChip icon={Gauge}    value={`${main.pressure} hPa`}           label="Pressure" />
                            <StatChip icon={Eye}      value={`${(visibility/1000).toFixed(1)} km`} label="Vis" />
                        </div>
                        {/* LIVE badge — bottom right, non-obtrusive */}
                        <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-md border border-white/15 text-white text-[10px] font-bold tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            LIVE
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatChip = ({ icon: Icon, value, label }) => (
    <div className="flex items-center gap-1.5 text-white/80">
        <Icon className="w-3.5 h-3.5 opacity-70 flex-shrink-0" strokeWidth={2} />
        <span className="text-xs sm:text-sm font-semibold drop-shadow-sm">{value}</span>
        <span className="text-[10px] text-white/50 hidden sm:block">{label}</span>
    </div>
);

export default CurrentWeather;
