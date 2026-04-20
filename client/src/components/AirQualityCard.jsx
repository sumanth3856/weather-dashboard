import React from 'react';
import { Wind } from 'lucide-react';

const AQI_CONFIG = {
    1: { label: 'Good',      desc: 'Air is clean — safe for all outdoor activities.',   color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-700/50', stroke: '#10b981' },
    2: { label: 'Fair',      desc: 'Acceptable air quality for most people.',            color: 'text-amber-500 dark:text-amber-400',   bg: 'bg-amber-50 dark:bg-amber-900/20',   border: 'border-amber-200 dark:border-amber-700/50',   stroke: '#f59e0b' },
    3: { label: 'Moderate',  desc: 'Sensitive groups may experience minor effects.',     color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-700/50', stroke: '#f97316' },
    4: { label: 'Poor',      desc: 'Health effects possible. Limit outdoor exposure.',   color: 'text-rose-500 dark:text-rose-400',     bg: 'bg-rose-50 dark:bg-rose-900/20',     border: 'border-rose-200 dark:border-rose-700/50',     stroke: '#f43f5e' },
    5: { label: 'Very Poor', desc: 'Serious health risk. Avoid outdoor activity.',       color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-700/50', stroke: '#a855f7' },
};

// Circumference for r=26 gauge circle
const CIRC = 2 * Math.PI * 26; // ≈ 163.4

const AirQualityCard = ({ data }) => {
    if (!data || !data.list || data.list.length === 0) return null;

    const aqi = data.list[0].main.aqi;
    const c   = data.list[0].components;
    const cfg = AQI_CONFIG[aqi] || { label: 'Unknown', desc: '', color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', stroke: '#94a3b8' };
    const dashOffset = CIRC - (CIRC * (aqi / 5));

    return (
        <div className="premium-panel p-5 animate-fade-in h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-brand-900 dark:text-white flex items-center gap-2 tracking-tight">
                    <Wind className="w-4 h-4 text-accent" strokeWidth={2} />
                    Air Quality
                </h3>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                    {cfg.label}
                </span>
            </div>

            {/* Gauge + info */}
            <div className="flex items-center gap-4 mb-5">
                {/* SVG gauge — r=26, 64×64 */}
                <div className="relative w-16 h-16 flex-shrink-0">
                    <svg viewBox="0 0 64 64" className="-rotate-90 w-full h-full">
                        {/* Track */}
                        <circle cx="32" cy="32" r="26" fill="none"
                            stroke="currentColor" strokeWidth="5"
                            className="text-zinc-100 dark:text-white/5" />
                        {/* Progress */}
                        <circle cx="32" cy="32" r="26" fill="none"
                            stroke={cfg.stroke} strokeWidth="5"
                            strokeLinecap="round"
                            strokeDasharray={CIRC}
                            strokeDashoffset={dashOffset}
                            className="transition-all duration-1000 ease-out" />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-xl font-black ${cfg.color}`}>
                        {aqi}
                    </span>
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-bold text-brand-900 dark:text-white leading-tight">Air Quality Index</p>
                    <p className="text-xs text-brand-400 dark:text-brand-500 font-medium mt-1 leading-snug">{cfg.desc}</p>
                </div>
            </div>

            {/* Pollutants grid */}
            <div className="grid grid-cols-3 gap-2 mt-auto">
                <Pollutant label="PM2.5" value={c.pm2_5?.toFixed(1)} />
                <Pollutant label="PM10"  value={c.pm10?.toFixed(1)} />
                <Pollutant label="O₃"    value={c.o3?.toFixed(1)} />
                <Pollutant label="NO₂"   value={c.no2?.toFixed(1)} />
                <Pollutant label="SO₂"   value={c.so2?.toFixed(1)} />
                <Pollutant label="CO"    value={c.co?.toFixed(0)} />
            </div>
        </div>
    );
};

const Pollutant = ({ label, value }) => (
    <div className="bg-zinc-50 dark:bg-[#18181b] rounded-xl p-2.5 text-center border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-colors">
        <p className="label-caps mb-1">{label}</p>
        <p className="text-sm font-bold text-brand-900 dark:text-white tabular-nums">{value ?? '—'}</p>
    </div>
);

export default AirQualityCard;
