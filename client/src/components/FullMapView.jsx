import React from 'react';
import WeatherMap from './WeatherMap';
import { Map, Navigation } from 'lucide-react';

const FullMapView = ({ coord, city }) => {
    if (!coord) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8 flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-zinc-300 dark:text-slate-600" strokeWidth={1.5} />
            </div>
            <p className="text-base font-bold text-brand-900 dark:text-white mb-1.5">No location selected</p>
            <p className="text-sm text-brand-400 dark:text-brand-500 font-medium">Search for a city to view it on the map.</p>
        </div>
    );

    return (
        <div className="animate-fade-in space-y-4" style={{ height: 'calc(100vh - 8rem)' }}>

            {/* Header bar */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8 flex items-center justify-center">
                        <Map className="w-4 h-4 text-accent" strokeWidth={2} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-brand-900 dark:text-white tracking-tight">Map View</h2>
                        {city && (
                            <p className="label-caps mt-0.5 flex items-center gap-1">
                                <Navigation className="w-2.5 h-2.5" strokeWidth={2} />
                                {city}
                                {coord && ` · ${coord.lat.toFixed(2)}°N, ${coord.lon.toFixed(2)}°E`}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Map panel */}
            <div className="flex-1 overflow-hidden premium-panel" style={{ height: 'calc(100% - 60px)' }}>
                <WeatherMap coord={coord} city={city} className="h-full w-full" />
            </div>
        </div>
    );
};

export default FullMapView;
