import React from 'react';

const UnitToggle = ({ unit, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-md"
        >
            <span
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${unit === 'metric' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
                    }`}
            >
                °C
            </span>
            <span
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${unit === 'imperial' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'
                    }`}
            >
                °F
            </span>
        </button>
    );
};

export default UnitToggle;
