import React from 'react';
import { Compass, Home } from 'lucide-react';

const NotFound = ({ onHome }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
            <div className="w-24 h-24 rounded-3xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/5 flex items-center justify-center mb-6">
                <Compass className="w-10 h-10 text-zinc-400 dark:text-slate-500" strokeWidth={1.5} />
            </div>
            <h1 className="text-6xl font-bold text-brand-900 dark:text-white mb-4 tracking-tighter">404</h1>
            <h2 className="text-2xl font-semibold text-brand-600 dark:text-brand-300 mb-8">Page Not Found</h2>
            <p className="text-brand-500 dark:text-slate-400 max-w-md mb-8 font-medium">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button
                onClick={onHome}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-900 dark:bg-white text-white dark:text-brand-900 rounded-xl transition-all duration-200 font-bold text-sm hover:opacity-90"
            >
                <Home className="w-4 h-4" strokeWidth={2.5} />
                Go Back Home
            </button>
        </div>
    );
};

export default NotFound;

