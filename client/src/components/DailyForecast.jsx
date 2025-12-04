import React from 'react';

const DailyForecast = ({ data, unit }) => {
    if (!data || !data.list) return null;

    // Process data to get one forecast per day (e.g., at 12:00 PM)

    // If we don't have enough noon data (e.g. late night), take the first available for each day
    // A more robust way: group by date
    const groupedByDate = {};
    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!groupedByDate[date]) {
            groupedByDate[date] = item;
        } else {
            // Prefer noon time if available
            if (item.dt_txt.includes('12:00:00')) {
                groupedByDate[date] = item;
            }
        }
    });

    const dailyList = Object.values(groupedByDate).slice(0, 5);

    return (
        <div className="glass-panel p-6 animate-fade-in mt-6">
            <h3 className="text-slate-900 dark:text-white font-light text-lg tracking-wide mb-4">5-Day Forecast</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {dailyList.map((item) => {
                    const date = new Date(item.dt * 1000);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const temp = unit === 'metric' ? Math.round(item.main.temp) : Math.round(item.main.temp * 9 / 5 + 32);
                    const unitSymbol = unit === 'metric' ? '°C' : '°F';

                    return (
                        <div key={item.dt} className="flex flex-col items-center p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/5">
                            <span className="text-slate-700 dark:text-slate-400 text-sm font-medium mb-2">{dayName}</span>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                                className="w-10 h-10 mb-2"
                            />
                            <span className="text-slate-900 dark:text-white font-bold text-lg">{temp}{unitSymbol}</span>
                            <span className="text-xs text-slate-700 capitalize mt-1">{item.weather[0].main}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyForecast;
