import React, { useState } from 'react';
import { RefreshCw, CloudOff, WifiOff, SearchX, KeyRound, MapPinOff, Gauge, Clock, Lightbulb, ArrowRight } from 'lucide-react';
import { classifyError } from '../utils/errorMessages';

/* Map error type → icon + color scheme */
const ERROR_STYLES = {
    not_found:   { Icon: SearchX,    ring: 'border-amber-200  dark:border-amber-800/40',  bg: 'bg-amber-50   dark:bg-amber-900/10',  icon: 'bg-amber-100  dark:bg-amber-900/30  text-amber-500  dark:text-amber-400',  btn: 'bg-amber-500  hover:bg-amber-600  text-white' },
    network:     { Icon: WifiOff,    ring: 'border-sky-200    dark:border-sky-800/40',    bg: 'bg-sky-50     dark:bg-sky-900/10',    icon: 'bg-sky-100    dark:bg-sky-900/30    text-sky-500    dark:text-sky-400',    btn: 'bg-sky-500    hover:bg-sky-600    text-white' },
    rate_limit:  { Icon: Clock,      ring: 'border-violet-200 dark:border-violet-800/40', bg: 'bg-violet-50  dark:bg-violet-900/10', icon: 'bg-violet-100 dark:bg-violet-900/30 text-violet-500 dark:text-violet-400', btn: 'bg-violet-500 hover:bg-violet-600 text-white' },
    auth:        { Icon: KeyRound,   ring: 'border-rose-200   dark:border-rose-800/40',   bg: 'bg-rose-50    dark:bg-rose-900/10',   icon: 'bg-rose-100   dark:bg-rose-900/30   text-rose-500   dark:text-rose-400',   btn: 'bg-rose-500   hover:bg-rose-600   text-white' },
    geo_denied:  { Icon: MapPinOff,  ring: 'border-orange-200 dark:border-orange-800/40', bg: 'bg-orange-50  dark:bg-orange-900/10', icon: 'bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400', btn: 'bg-orange-500 hover:bg-orange-600 text-white' },
    geo_unsup:   { Icon: Gauge,      ring: 'border-zinc-200   dark:border-zinc-700/40',   bg: 'bg-zinc-50    dark:bg-zinc-900/10',   icon: 'bg-zinc-100   dark:bg-zinc-800       text-zinc-500   dark:text-zinc-400',   btn: 'bg-zinc-700   hover:bg-zinc-800   text-white' },
    generic:     { Icon: CloudOff,   ring: 'border-slate-200  dark:border-slate-700/40',  bg: 'bg-slate-50   dark:bg-slate-900/10',  icon: 'bg-slate-100  dark:bg-slate-800      text-slate-500  dark:text-slate-400',  btn: 'bg-slate-700  hover:bg-slate-800  text-white' },
};

const ErrorDisplay = ({ message, onRetry }) => {
    const [retrying, setRetrying] = useState(false);
    const error = classifyError(message);
    const style = ERROR_STYLES[error.type] || ERROR_STYLES.generic;
    const { Icon } = style;

    const handleRetry = async () => {
        if (!onRetry) return;
        setRetrying(true);
        try { await onRetry(); } finally { setRetrying(false); }
    };

    const showRetry = onRetry && !['geo_denied', 'geo_unsup', 'auth'].includes(error.type);

    return (
        <div className={`
            w-full max-w-lg mx-auto rounded-2xl border p-8 text-center
            animate-fade-in shadow-sm
            ${style.ring} ${style.bg}
        `}>
            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl ${style.icon} flex items-center justify-center mx-auto mb-5 shadow-sm border border-white/50 dark:border-white/5`}>
                <Icon className="w-7 h-7" strokeWidth={1.75} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-2 leading-tight">
                {error.title}
            </h3>

            {/* Subtitle — the funny bit */}
            <p className="text-brand-600 dark:text-brand-300 text-sm font-medium mb-3 leading-relaxed">
                {error.subtitle}
            </p>

            {/* Tip */}
            <p className="flex items-start justify-center gap-1.5 text-brand-400 dark:text-brand-500 text-xs mb-7 leading-relaxed">
                <Lightbulb className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-accent/60" strokeWidth={2} />
                {error.tip}
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
                {showRetry && (
                    <button
                        onClick={handleRetry}
                        disabled={retrying}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm disabled:opacity-60 ${style.btn}`}
                    >
                        <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} strokeWidth={2.5} />
                        {retrying ? 'Summoning the clouds…' : 'Try Again'}
                    </button>
                )}
                {error.type === 'geo_denied' && (
                    <p className="flex items-center justify-center gap-1.5 text-xs text-brand-500 dark:text-brand-400 mt-1 w-full">
                        <ArrowRight className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                        Type a city name in the search bar above.
                    </p>
                )}
                {error.type === 'auth' && (
                    <p className="flex items-center justify-center gap-1.5 text-xs text-brand-500 dark:text-brand-400 mt-1 w-full">
                        <Clock className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                        This usually auto-resolves. No action needed on your end.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ErrorDisplay;
