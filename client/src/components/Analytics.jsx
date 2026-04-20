import React from 'react';
import ForecastChart from './ForecastChart';
import TrendChart from './TrendChart';
import { BarChart2, Droplets, Wind, TrendingUp } from 'lucide-react';

const SectionCard = ({ icon: Icon, title, children, className = '' }) => (
    <div className={`premium-panel p-6 ${className}`}>
        <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-accent" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-bold text-brand-900 dark:text-white tracking-tight">{title}</h3>
        </div>
        {children}
    </div>
);

const Analytics = ({ data, unit }) => {
    if (!data) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8 flex items-center justify-center mb-4">
                <BarChart2 className="w-6 h-6 text-zinc-300 dark:text-slate-600" strokeWidth={1.5} />
            </div>
            <p className="text-base font-bold text-brand-900 dark:text-white mb-1.5">No data yet</p>
            <p className="text-sm text-brand-400 dark:text-brand-500 font-medium">Search for a city to view analytics.</p>
        </div>
    );

    const cityName = data.city?.name || 'Selected City';

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page header */}
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8 flex items-center justify-center flex-shrink-0">
                    <BarChart2 className="w-5 h-5 text-accent" strokeWidth={2} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-brand-900 dark:text-white tracking-tight">Analytics</h2>
                    <p className="label-caps mt-0.5">{cityName} — 5-day overview</p>
                </div>
            </div>

            {/* Temperature trend — full width */}
            <SectionCard icon={TrendingUp} title="Temperature Trends (5-Day)">
                <div className="h-80">
                    <ForecastChart data={data} unit={unit} />
                </div>
            </SectionCard>

            {/* Humidity + Wind — 2 col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SectionCard icon={Droplets} title="Humidity Analysis">
                    <div className="h-56">
                        <TrendChart data={data} dataKey="main.humidity" label="Humidity" unit="%" color="#0ea5e9" />
                    </div>
                </SectionCard>
                <SectionCard icon={Wind} title="Wind Speed Analysis">
                    <div className="h-56">
                        <TrendChart data={data} dataKey="wind.speed" label="Wind Speed" unit="m/s" color="#10b981" />
                    </div>
                </SectionCard>
            </div>
        </div>
    );
};

export default Analytics;
