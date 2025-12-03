import React from 'react';

const Favorites = ({ favorites, onSelect, onRemove }) => {
    if (!favorites || favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400 animate-fade-in">
                <span className="text-4xl mb-4 opacity-50">⭐</span>
                <p className="text-lg font-light">No favorite cities yet.</p>
                <p className="text-sm opacity-60">Search for a city and click the star to save it.</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-light text-slate-900 dark:text-white mb-6">Favorite Cities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((city) => (
                    <div
                        key={city}
                        className="glass-panel p-4 flex items-center justify-between group hover:bg-black/5 dark:hover:bg-white/10 transition-all cursor-pointer border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/20"
                        onClick={() => onSelect(city)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-lg">
                                🏙️
                            </div>
                            <span className="text-lg font-light text-slate-900 dark:text-white">{city}</span>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(city);
                            }}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
                            title="Remove from favorites"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
