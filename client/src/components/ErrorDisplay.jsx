import React from 'react';

const ErrorDisplay = ({ message, onRetry }) => {
    const isNetworkError = message?.toLowerCase().includes('network') || message?.toLowerCase().includes('fetch');
    const isNotFound = message?.toLowerCase().includes('404') || message?.toLowerCase().includes('not found');
    const isAuthError = message?.toLowerCase().includes('401') || message?.toLowerCase().includes('api key');

    let icon = '⚠️';
    let title = 'Something went wrong';
    let description = message || 'An unexpected error occurred.';

    if (isNetworkError) {
        icon = '📡';
        title = 'Connection Issue';
        description = 'Please check your internet connection and try again.';
    } else if (isNotFound) {
        icon = '🔍';
        title = 'City Not Found';
        description = 'We couldn\'t find that location. Please check the spelling.';
    } else if (isAuthError) {
        icon = '🔑';
        title = 'Authentication Error';
        description = 'There is an issue with the API key. It might still be activating (takes up to 2 hours).';
    }

    return (
        <div className="glass-panel p-8 max-w-md mx-auto text-center animate-fade-in border-red-500/30 bg-red-500/5">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-300 mb-6">{description}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-all duration-300 font-medium"
                >
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorDisplay;
