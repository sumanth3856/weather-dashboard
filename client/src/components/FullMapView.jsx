import React from 'react';
import WeatherMap from './WeatherMap';

const FullMapView = ({ coord, city }) => {
    if (!coord) return <div className="text-center text-slate-400 mt-20">No location data. Please search for a city.</div>;

    return (
        <div className="h-[calc(100vh-8rem)] animate-fade-in flex flex-col">
            <h2 className="text-2xl font-light text-white mb-6">Global Map View</h2>
            <div className="flex-1 overflow-hidden relative">
                <WeatherMap coord={coord} city={city} className="h-full" />
            </div>
        </div>
    );
};

export default FullMapView;
