import React from 'react';

const CurrentWeather = ({ data, unit, isFavorite, onToggleFavorite }) => {
    if (!data) return null;

    const { name, main, weather, wind, visibility, sys } = data;
    const temp = unit === 'metric' ? Math.round(main.temp) : Math.round(main.temp * 9 / 5 + 32);
    const unitSymbol = unit === 'metric' ? '°C' : '°F';
    const feelsLike = unit === 'metric' ? Math.round(main.feels_like) : Math.round(main.feels_like * 9 / 5 + 32);

    return (
        <div className="glass-panel flex flex-col justify-between p-6 animate-fade-in relative overflow-hidden group">
            {/* Subtle background glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-700"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-xl font-light text-slate-900 dark:text-white flex items-center gap-2">
                            {name}, <span className="opacity-60">{sys.country}</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 capitalize tracking-wide">{weather[0].description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onToggleFavorite}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isFavorite ? 'bg-yellow-400 text-slate-900' : 'bg-black/5 dark:bg-white/5 text-slate-400 hover:bg-black/10 dark:hover:bg-white/10 hover:text-yellow-500 dark:hover:text-yellow-400'}`}
                            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <span className="text-lg">{isFavorite ? '★' : '☆'}</span>
                        </button>
                        <div className="px-3 py-1 rounded-full text-xs font-medium border border-black/10 dark:border-white/20 bg-white/40 dark:bg-white/5 backdrop-blur-md text-slate-700 dark:text-white">
                            LIVE
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                        alt={weather[0].description}
                        className="w-24 h-24 -ml-4 drop-shadow-2xl"
                    />
                    <div>
                        <div className="text-6xl font-thin text-slate-900 dark:text-white tracking-tighter">
                            {temp}<span className="text-2xl align-top opacity-60 font-normal">{unitSymbol}</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-light">Feels like {feelsLike}{unitSymbol}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <DetailItem label="Humidity" value={`${main.humidity}%`} icon="💧" />
                    <DetailItem label="Wind" value={`${wind.speed} m/s`} icon="💨" />
                    <DetailItem label="Pressure" value={`${main.pressure} hPa`} icon="⏲️" />
                    <DetailItem label="Visibility" value={`${(visibility / 1000).toFixed(1)} km`} icon="👁️" />
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value, icon }) => (
    <div className="bg-white/40 dark:bg-white/5 rounded-xl p-4 border border-black/5 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest mb-1 flex items-center gap-2 opacity-70">
            <span>{icon}</span> {label}
        </p>
        <p className="text-slate-900 dark:text-white font-light text-lg">{value}</p>
    </div>
);

export default CurrentWeather;
