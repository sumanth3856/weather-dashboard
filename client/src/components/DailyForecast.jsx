import React from 'react';

const DailyForecast = ({ data, unit }) => {
    if (!data || !data.list) return null;

    // Group forecast items by date; prefer the 12:00 reading
    const groupedByDate = {};
    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!groupedByDate[date]) groupedByDate[date] = { noon: null, items: [] };
        groupedByDate[date].items.push(item);
        if (item.dt_txt.includes('12:00:00')) groupedByDate[date].noon = item;
    });

    const dailyList = Object.entries(groupedByDate).slice(0, 5).map(([date, val]) => {
        const rep = val.noon || val.items[Math.floor(val.items.length / 2)];
        const allTemps = val.items.map(i =>
            unit === 'metric' ? i.main.temp : i.main.temp * 9 / 5 + 32
        );
        return {
            dt: rep.dt,
            date,
            rep,
            tempHigh: Math.round(Math.max(...allTemps)),
            tempLow:  Math.round(Math.min(...allTemps)),
        };
    });

    const globalHigh  = Math.max(...dailyList.map(d => d.tempHigh));
    const globalLow   = Math.min(...dailyList.map(d => d.tempLow));
    const globalRange = globalHigh - globalLow || 1;
    const unitLabel   = unit === 'metric' ? '°C' : '°F';

    return (
        <div className="premium-panel p-4 sm:p-6 animate-fade-in">

            {/* Header */}
            <div className="flex items-center justify-center sm:justify-between mb-4 sm:mb-5 gap-2">
                <h3 className="text-sm font-bold text-brand-900 dark:text-white tracking-tight">
                    5-Day Forecast
                </h3>
                <span className="label-caps">{unitLabel}</span>
            </div>

            {/*
              Mobile  (<sm) : horizontal scroll — each card is a fixed-width column
              Desktop (sm+) : 5-col equal grid
            */}
            <div className="
                flex gap-2 overflow-x-auto pb-1 snap-x snap-mandatory scroll-smooth
                sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:pb-0
                stagger-children
                [&::-webkit-scrollbar]:hidden
            ">
                {dailyList.map((day) => {
                    const date    = new Date(day.dt * 1000);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const dateNum = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                    const isToday = new Date().toDateString() === date.toDateString();

                    const barLeft  = ((day.tempLow  - globalLow)  / globalRange) * 100;
                    const barWidth = ((day.tempHigh - day.tempLow) / globalRange) * 100;

                    return (
                        <div
                            key={day.dt}
                            /* min-w keeps cards legible on mobile scroll; snap-center = nice swipe feel */
                            className={`
                                flex-shrink-0 snap-center
                                min-w-[72px] w-[calc((100vw-5rem)/3.8)] sm:min-w-0 sm:w-auto
                                flex flex-col items-center rounded-2xl
                                p-2.5 sm:p-4 border
                                transition-all duration-200 cursor-default group
                                ${isToday
                                    ? 'bg-accent/8 dark:bg-accent/10 border-accent/20 dark:border-accent/15'
                                    : 'bg-zinc-50 dark:bg-[#18181b] border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 hover:bg-white dark:hover:bg-[#1c1c1f]'
                                }
                            `}
                        >
                            {/* Day name */}
                            <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-0.5
                                ${isToday ? 'text-accent' : 'text-brand-500 dark:text-brand-400'}`}>
                                {isToday ? 'Today' : dayName}
                            </span>

                            {/* Date — hidden on mobile to save space */}
                            <span className="hidden sm:block text-[10px] text-brand-400 dark:text-brand-500 font-medium mb-2">
                                {dateNum}
                            </span>

                            {/* Weather icon */}
                            <img
                                src={`https://openweathermap.org/img/wn/${day.rep.weather[0].icon}@2x.png`}
                                alt={day.rep.weather[0].description}
                                className="w-9 h-9 sm:w-12 sm:h-12 my-1 drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                            />

                            {/* Condition label — hidden on mobile */}
                            <span className="hidden sm:block text-[9px] sm:text-[10px] text-brand-500 dark:text-brand-400 font-semibold capitalize text-center leading-tight mb-2">
                                {day.rep.weather[0].main}
                            </span>

                            {/* High temp */}
                            <span className={`text-xs sm:text-base font-bold leading-none
                                ${isToday ? 'text-accent' : 'text-brand-900 dark:text-white'}`}>
                                {day.tempHigh}°
                            </span>

                            {/* Thermal range bar — solid colors, no gradient */}
                            <div className="w-full my-1.5 sm:my-2 h-1 sm:h-1.5 rounded-full bg-zinc-200 dark:bg-white/10 relative overflow-hidden">
                                <div
                                    className={`absolute top-0 h-full rounded-full ${isToday ? 'bg-accent' : 'bg-slate-400 dark:bg-slate-500'}`}
                                    style={{
                                        left:  `${barLeft}%`,
                                        width: `${Math.max(barWidth, 14)}%`,
                                    }}
                                />
                            </div>

                            {/* Low temp */}
                            <span className="text-[10px] sm:text-xs font-semibold text-brand-400 dark:text-brand-500 leading-none">
                                {day.tempLow}°
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DailyForecast;
