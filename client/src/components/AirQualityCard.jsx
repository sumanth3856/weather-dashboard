import React from 'react';

const AirQualityCard = ({ data }) => {
    if (!data || !data.list || data.list.length === 0) return null;

    const aqi = data.list[0].main.aqi;
    const components = data.list[0].components;

    const getAQIStatus = (aqi) => {
        switch (aqi) {
            case 1: return { label: 'Good', color: 'text-green-400', bg: 'bg-green-400' };
            case 2: return { label: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-400' };
            case 3: return { label: 'Moderate', color: 'text-orange-400', bg: 'bg-orange-400' };
            case 4: return { label: 'Poor', color: 'text-red-400', bg: 'bg-red-400' };
            case 5: return { label: 'Very Poor', color: 'text-purple-400', bg: 'bg-purple-400' };
            default: return { label: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-400' };
        }
    };

    const status = getAQIStatus(aqi);

    return (
        <div className="glass-panel p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900 dark:text-white font-light text-lg flex items-center gap-2">
                    <span>🌍</span> Air Quality
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/40 dark:bg-white/10 ${status.color} border border-black/5 dark:border-white/10`}>
                    {status.label}
                </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-slate-200 dark:text-slate-700"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={175.93}
                            strokeDashoffset={175.93 - (175.93 * (aqi / 5))}
                            className={`${status.color} transition-all duration-1000 ease-out`}
                        />
                    </svg>
                    <span className={`absolute text-2xl font-bold ${status.color}`}>{aqi}</span>
                </div>
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Air Quality Index</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Scale: 1 (Good) - 5 (Very Poor)</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <Pollutant label="PM2.5" value={components.pm2_5} unit="µg/m³" />
                <Pollutant label="PM10" value={components.pm10} unit="µg/m³" />
                <Pollutant label="O₃" value={components.o3} unit="µg/m³" />
                <Pollutant label="NO₂" value={components.no2} unit="µg/m³" />
                <Pollutant label="SO₂" value={components.so2} unit="µg/m³" />
                <Pollutant label="CO" value={components.co} unit="µg/m³" />
            </div>
        </div>
    );
};

const Pollutant = ({ label, value, unit }) => (
    <div className="bg-white/40 dark:bg-white/5 rounded-lg p-2 text-center border border-black/5 dark:border-white/5">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500">{unit}</p>
    </div>
);

export default AirQualityCard;
