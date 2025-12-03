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
    map.flyTo(center, 10, {
        duration: 2
    });
    return null;
};

const WeatherMap = ({ coord, city, className }) => {
    if (!coord) return null;

    const position = [coord.lat, coord.lon];

    return (
        <div className={`glass-panel p-0 overflow-hidden relative group animate-fade-in ${className || 'h-80'}`} style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-4 left-4 z-[400] bg-white/40 dark:bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/5 dark:border-white/20 shadow-lg">
                <span className="text-xs text-slate-900 dark:text-white font-medium tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 animate-pulse"></span>
                    LIVE MAP
                </span>
            </div>

            <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    className="opacity-80 grayscale-[20%] contrast-[1.1]"
                />
                <ChangeView center={position} />
                <Marker position={position}>
                    <Popup className="glass-popup">
                        <div className="font-medium text-slate-800">{city}</div>
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Overlay gradient for smooth integration */}
            <div className="absolute inset-0 pointer-events-none z-[399] shadow-[inset_0_0_50px_rgba(0,0,0,0.2)]"></div>
        </div>
    );
};

export default WeatherMap;
