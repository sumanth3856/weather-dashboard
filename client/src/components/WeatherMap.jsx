import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeView = ({ center }) => {
    const map = useMap();
    map.flyTo(center, 10, { duration: 2 });
    return null;
};

const WeatherMap = ({ coord, city, className }) => {
    if (!coord) return null;

    const position = [coord.lat, coord.lon];

    return (
        <div className={`premium-panel p-1 overflow-hidden relative group animate-fade-in ${className || 'h-80'}`} style={{ animationDelay: '0.2s' }}>

            {/* LIVE MAP badge — top RIGHT */}
            <div className="absolute top-3 right-3 z-[400] bg-white/90 dark:bg-[#121214]/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 shadow-sm">
                <span className="text-xs text-brand-900 dark:text-white font-bold tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                    LIVE MAP
                </span>
            </div>

            <div className="h-full w-full rounded-xl overflow-hidden relative z-[390]">
                <MapContainer
                    center={position}
                    zoom={10}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                >
                    {/* Full-color OpenStreetMap tiles — no grayscale filter */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <ChangeView center={position} />
                    <Marker position={position}>
                        <Popup>
                            <div className="font-bold text-slate-800 font-sans">{city}</div>
                        </Popup>
                    </Marker>
                </MapContainer>
                {/* Subtle vignette around edges for panel blending */}
                <div className="absolute inset-0 pointer-events-none z-[399] shadow-[inset_0_0_32px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_0_32px_rgba(0,0,0,0.3)] rounded-xl"></div>
            </div>
        </div>
    );
};

export default WeatherMap;
