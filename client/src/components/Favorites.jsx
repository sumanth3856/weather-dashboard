import React from 'react';
import { Star, MapPin, ArrowRight, X } from 'lucide-react';

const Favorites = ({ favorites, onSelect, onRemove }) => {
    if (!favorites || favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8 flex items-center justify-center mb-5">
                    <Star className="w-7 h-7 text-zinc-300 dark:text-slate-600" strokeWidth={1.5} />
                </div>
                <p className="text-base font-bold text-brand-900 dark:text-white mb-1.5">No saved cities</p>
                <p className="text-sm text-brand-400 dark:text-brand-500 font-medium text-center max-w-xs">
                    Search any city and press the star icon to save it here.
                </p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-brand-900 dark:text-white tracking-tight">Favorite Cities</h2>
                <p className="label-caps mt-1">{favorites.length} {favorites.length === 1 ? 'city' : 'cities'} saved</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
                {favorites.map((city) => (
                    <div
                        key={city}
                        onClick={() => onSelect(city)}
                        className="premium-panel p-4 flex items-center gap-3 cursor-pointer group relative"
                    >
                        {/* City icon */}
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8 flex items-center justify-center flex-shrink-0 group-hover:border-accent/25 group-hover:bg-accent/5 transition-colors duration-200">
                            <MapPin className="w-4.5 h-4.5 text-slate-400 group-hover:text-accent transition-colors duration-200" strokeWidth={1.75} />
                        </div>

                        {/* City name */}
                        <span className="flex-1 text-sm font-semibold text-brand-900 dark:text-white truncate">
                            {city}
                        </span>

                        {/* Arrow — always visible, remove on hover */}
                        <ArrowRight
                            className="w-4 h-4 text-slate-300 dark:text-white/20 group-hover:hidden flex-shrink-0 transition-all duration-150"
                            strokeWidth={2}
                        />

                        {/* Remove — only on hover */}
                        <button
                            onClick={(e) => { e.stopPropagation(); onRemove(city); }}
                            title="Remove"
                            className="hidden group-hover:flex items-center justify-center w-7 h-7 rounded-lg border border-zinc-200 dark:border-white/8 text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-900/40 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors duration-150 flex-shrink-0"
                        >
                            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
