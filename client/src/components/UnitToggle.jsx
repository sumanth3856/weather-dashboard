import React from 'react';

const UnitToggle = ({ unit, onToggle }) => (
    <button
        onClick={onToggle}
        aria-label="Toggle Temperature Unit"
        className="flex items-center p-1 gap-0.5 bg-zinc-100 dark:bg-[#18181b] border border-zinc-200 dark:border-white/8 rounded-lg cursor-pointer transition-colors shadow-sm"
    >
        {['metric', 'imperial'].map((u) => (
            <span
                key={u}
                className={`
                    px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-200 select-none
                    ${unit === u
                        ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm border border-zinc-200 dark:border-white/8 scale-[1.02]'
                        : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }
                `}
            >
                {u === 'metric' ? '°C' : '°F'}
            </span>
        ))}
    </button>
);

export default UnitToggle;
