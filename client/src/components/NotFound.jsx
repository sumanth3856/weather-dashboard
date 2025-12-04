import React from 'react';

const NotFound = ({ onHome }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
            <div className="text-9xl mb-4">🛸</div>
            <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
            <h2 className="text-2xl text-slate-600 dark:text-slate-300 mb-8">Page Not Found</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button
                onClick={onHome}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 font-medium"
            >
                Go Back Home
            </button>
        </div>
    );
};

export default NotFound;
