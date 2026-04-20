import React from 'react';
import { Sun, Moon, Sunrise, Sunset, Clock } from 'lucide-react';

const SunriseSunset = ({ data }) => {
    if (!data || !data.sys) return null;

    const { sunrise, sunset } = data.sys;
    const now = Math.floor(Date.now() / 1000);

    const fmt = (ts) =>
        new Date(ts * 1000).toLocaleTimeString('en-US', {
            hour: 'numeric', minute: '2-digit', hour12: true,
        });

    const progress   = Math.min(Math.max((now - sunrise) / (sunset - sunrise), 0), 1);
    const isDaytime  = now >= sunrise && now <= sunset;
    const isPreDawn  = now < sunrise;

    const daySecondsTotal = sunset - sunrise;
    const dayHours   = Math.floor(daySecondsTotal / 3600);
    const dayMinutes = Math.floor((daySecondsTotal % 3600) / 60);

    const remaining = isDaytime ? sunset - now : isPreDawn ? sunrise - now : 0;
    const remH = Math.floor(remaining / 3600);
    const remM = Math.floor((remaining % 3600) / 60);
    const remLabel = isDaytime
        ? `${remH}h ${remM}m until sunset`
        : isPreDawn ? `${remH}h ${remM}m until sunrise` : 'After dusk';

    /* ── SVG geometry (responsive via viewBox only) ── */
    const W = 280, H = 120;
    const cx = W / 2;
    const cy = H + 8;   // center below the SVG bottom — arc rises into view
    const r  = 118;     // radius — top of arc sits at cy - r = ~10px from top

    const toRad = (deg) => (deg * Math.PI) / 180;
    const arcPoint = (deg) => ({
        x: cx + r * Math.cos(toRad(deg)),
        y: cy - r * Math.sin(toRad(deg)),
    });

    const sunDeg   = 180 - progress * 180;
    const sunPos   = arcPoint(sunDeg);
    const arcStart = arcPoint(180);
    const arcEnd   = arcPoint(0);

    // Golden hour: ~30 min on each end
    const ghFrac         = (30 * 60) / daySecondsTotal;
    const ghRiseEndDeg   = 180 - ghFrac * 180;
    const ghSetStartDeg  = ghFrac * 180;
    const ghRiseD = `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 1 ${arcPoint(ghRiseEndDeg).x} ${arcPoint(ghRiseEndDeg).y}`;
    const ghSetD  = `M ${arcPoint(ghSetStartDeg).x} ${arcPoint(ghSetStartDeg).y} A ${r} ${r} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;

    const trackD = `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 0 1 ${arcEnd.x} ${arcEnd.y}`;
    const progD  = progress > 0
        ? `M ${arcStart.x} ${arcStart.y} A ${r} ${r} 0 ${progress >= 0.5 ? 1 : 0} 1 ${sunPos.x} ${sunPos.y}`
        : null;

    const sunGlow = isDaytime ? '#fbbf24' : '#94a3b8';
    const sunCore = isDaytime ? '#fef9c3' : '#e2e8f0';

    // SVG text fill — inline style since Tailwind fill- classes don't apply in SVG
    const labelFill = 'rgba(148,163,184,0.7)';

    return (
        <div className="premium-panel p-5 animate-fade-in h-full flex flex-col">

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-brand-900 dark:text-white font-bold text-sm tracking-widest uppercase">
                    Solar Arc
                </h3>
                <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    isDaytime
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                }`}>
                    {isDaytime
                        ? <><Sun  className="w-3 h-3" strokeWidth={2} /> Daytime</>
                        : isPreDawn
                            ? <><Sunrise className="w-3 h-3" strokeWidth={2} /> Pre-dawn</>
                            : <><Moon   className="w-3 h-3" strokeWidth={2} /> Night</>
                    }
                </span>
            </div>

            {/* ── Arc + data pushed to bottom ── */}
            <div className="mt-auto">

                {/* SVG — responsive width, fixed viewBox aspect */}
                <svg
                    viewBox={`0 0 ${W} ${H + 16}`}
                    width="100%"
                    className="overflow-visible block"
                    style={{ maxHeight: 148 }}
                >
                    <defs>
                        <linearGradient id="pgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stopColor="#f59e0b" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.95" />
                        </linearGradient>
                        <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
                            <stop offset="0%"   stopColor={sunGlow} stopOpacity="0.35" />
                            <stop offset="100%" stopColor={sunGlow} stopOpacity="0" />
                        </radialGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3.5" result="b" />
                            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                    </defs>

                    {/* Horizon dashed line */}
                    <line
                        x1={arcStart.x - 14} y1={cy}
                        x2={arcEnd.x + 14}   y2={cy}
                        stroke="currentColor" strokeWidth="1"
                        strokeDasharray="5 4" opacity="0.2"
                    />

                    {/* Ground gradient beneath horizon */}
                    <rect x={arcStart.x - 14} y={cy} width={arcEnd.x - arcStart.x + 28} height="10"
                        fill="url(#pgGrad)" opacity="0.05" rx="2" />

                    {/* Track arc */}
                    <path d={trackD} fill="none" stroke="currentColor"
                        strokeWidth="2.5" strokeLinecap="round" opacity="0.12" />

                    {/* Golden hour arcs */}
                    <path d={ghRiseD} fill="none" stroke="#f59e0b"
                        strokeWidth="4.5" strokeLinecap="round" opacity="0.5" />
                    <path d={ghSetD}  fill="none" stroke="#f97316"
                        strokeWidth="4.5" strokeLinecap="round" opacity="0.5" />

                    {/* Progress arc */}
                    {progD && (
                        <path d={progD} fill="none" stroke="url(#pgGrad)"
                            strokeWidth="3.5" strokeLinecap="round" />
                    )}

                    {/* Sun halo */}
                    <circle cx={sunPos.x} cy={sunPos.y} r="24"
                        fill="url(#sunHalo)" />

                    {/* Sun body */}
                    <circle cx={sunPos.x} cy={sunPos.y} r="9"
                        fill={sunGlow} opacity="0.95" filter="url(#glow)" />

                    {/* Sun core */}
                    <circle cx={sunPos.x - 2.5} cy={sunPos.y - 2.5} r="3.5"
                        fill={sunCore} opacity="0.95" />

                    {/* Drop line — only when sun is above horizon */}
                    {progress > 0 && progress < 1 && (
                        <line x1={sunPos.x} y1={sunPos.y + 10}
                              x2={sunPos.x} y2={cy - 1}
                              stroke={sunGlow} strokeWidth="1"
                              strokeDasharray="3 4" opacity="0.35" />
                    )}

                    {/* Rise / Set inline text (inline style, not Tailwind fill-) */}
                    <text x={arcStart.x} y={cy + 14} textAnchor="middle"
                        fontSize="8.5" fontWeight="700" letterSpacing="0.08em"
                        fill={labelFill} style={{ textTransform: 'uppercase' }}>
                        Rise
                    </text>
                    <text x={arcEnd.x} y={cy + 14} textAnchor="middle"
                        fontSize="8.5" fontWeight="700" letterSpacing="0.08em"
                        fill={labelFill} style={{ textTransform: 'uppercase' }}>
                        Set
                    </text>

                    {/* Golden hour label — left side */}
                    <text x={arcStart.x + 22} y={cy - 4} textAnchor="middle"
                        fontSize="7" fontWeight="600" fill="#f59e0b" opacity="0.7">
                        Golden
                    </text>
                    <text x={arcEnd.x - 22} y={cy - 4} textAnchor="middle"
                        fontSize="7" fontWeight="600" fill="#f97316" opacity="0.7">
                        Golden
                    </text>
                </svg>

                {/* ── Info row ── */}
                <div className="grid grid-cols-3 gap-0 mt-2 border-t border-zinc-100 dark:border-white/5 pt-3">
                    <div>
                        <p className="flex items-center gap-1 text-[9px] font-bold text-brand-400 dark:text-brand-500 uppercase tracking-widest mb-1">
                            <Sunrise className="w-3 h-3 text-amber-500" strokeWidth={2} /> Rise
                        </p>
                        <p className="text-sm font-bold text-amber-500 dark:text-amber-400">{fmt(sunrise)}</p>
                    </div>

                    <div className="text-center border-x border-zinc-100 dark:border-white/5">
                        <p className="text-[9px] font-bold text-brand-400 dark:text-brand-500 uppercase tracking-widest mb-1">Day</p>
                        <p className="text-sm font-bold text-brand-900 dark:text-white">{dayHours}h {dayMinutes}m</p>
                    </div>

                    <div className="text-right">
                        <p className="flex items-center justify-end gap-1 text-[9px] font-bold text-brand-400 dark:text-brand-500 uppercase tracking-widest mb-1">
                            Set <Sunset className="w-3 h-3 text-orange-400" strokeWidth={2} />
                        </p>
                        <p className="text-sm font-bold text-orange-500 dark:text-orange-400">{fmt(sunset)}</p>
                    </div>
                </div>

                {/* ── Remaining time strip ── */}
                {remaining > 0 && (
                    <div className="mt-3">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="flex items-center gap-1 text-[10px] text-brand-400 dark:text-brand-500 font-medium">
                                <Clock className="w-3 h-3 flex-shrink-0" strokeWidth={2} />
                                {remLabel}
                            </span>
                            <span className="text-[10px] font-bold text-accent tabular-nums">
                                {Math.round(progress * 100)}%
                            </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-white/8 overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-1000"
                                style={{
                                    width: `${progress * 100}%`,
                                    background: 'linear-gradient(to right, #f59e0b, #0ea5e9)',
                                }}
                            />
                        </div>
                    </div>
                )}

            </div>{/* end mt-auto */}
        </div>
    );
};

export default SunriseSunset;
