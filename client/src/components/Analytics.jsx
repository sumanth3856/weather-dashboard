import React from 'react';
import ForecastChart from './ForecastChart';
import TrendChart from './TrendChart';

const Analytics = ({ data, unit }) => {
    if (!data) return <div className="text-center text-slate-400 mt-20">No data available. Please search for a city.</div>;

    const cityName = data.city ? data.city.name : 'Selected City';

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-light text-slate-900 dark:text-white">
                Weather Analytics: <span className="font-medium">{cityName}</span>
            </h2>
            <div className="glass-panel p-6">
                <h3 className="text-slate-900 dark:text-white font-light text-lg mb-4">Temperature Trends (5-Day)</h3>
                <div className="h-96">
                    <ForecastChart data={data} unit={unit} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6">
                    <h3 className="text-slate-900 dark:text-white font-light text-lg mb-4">Humidity Analysis</h3>
                    <div className="h-64">
                        <TrendChart
                            data={data}
                            dataKey="main.humidity"
                            label="Humidity"
                            unit="%"
                            color="#0ea5e9" // Sky blue
                        />
                    </div>
                </div>
                <div className="glass-panel p-6">
                    <h3 className="text-slate-900 dark:text-white font-light text-lg mb-4">Wind Speed Analysis</h3>
                    <div className="h-64">
                        <TrendChart
                            data={data}
                            dataKey="wind.speed"
                            label="Wind Speed"
                            unit="m/s"
                            color="#14b8a6" // Teal
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
