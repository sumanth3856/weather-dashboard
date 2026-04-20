import React from 'react';

const S = ({ className }) => (
    <div className={`skeleton-shimmer rounded-xl ${className}`} />
);

const SkeletonLoader = () => (
    <div className="space-y-6 animate-fade-in">

        {/* ── Row 1: CurrentWeather hero ── */}
        {/* Mirrors: rounded-2xl, min-h-[360px], scene bg, content flex-col p-5 sm:p-7 */}
        <div className="skeleton-shimmer rounded-2xl min-h-[360px] relative overflow-hidden">
            {/* Overlay content layer */}
            <div className="absolute inset-0 flex flex-col p-5 sm:p-7">
                {/* Top: city name + star */}
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <S className="h-6 w-40 !bg-white/20 dark:!bg-white/10" />
                        <S className="h-3.5 w-24 !bg-white/15 dark:!bg-white/8" />
                    </div>
                    <S className="h-9 w-9 rounded-full !bg-white/20 dark:!bg-white/10" />
                </div>

                {/* Middle: icon + big temp */}
                <div className="flex items-center gap-4 mt-auto mb-auto pt-6 pb-2">
                    <S className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl !bg-white/20 dark:!bg-white/10 flex-shrink-0" />
                    <div className="space-y-3">
                        <S className="h-14 w-36 sm:h-16 !bg-white/20 dark:!bg-white/10" />
                        <S className="h-3.5 w-28 !bg-white/15 dark:!bg-white/8" />
                    </div>
                </div>

                {/* Bottom: stat chips + LIVE badge */}
                <div className="mt-auto">
                    <div className="w-full h-px bg-white/20 mb-3" />
                    <div className="flex items-center justify-between gap-2">
                        {/* 4 stat chips */}
                        <div className="flex gap-4 sm:gap-6">
                            {[36, 32, 44, 28].map((w, i) => (
                                <S key={i} className={`h-3.5 w-[${w}px] !bg-white/20 dark:!bg-white/10`} />
                            ))}
                        </div>
                        {/* LIVE badge */}
                        <S className="h-6 w-14 rounded-full !bg-white/20 dark:!bg-white/10 flex-shrink-0" />
                    </div>
                </div>
            </div>
        </div>

        {/* ── Row 2: 5-Day Forecast ── */}
        {/* Mobile: flex scroll row (~3.8 cards visible); Desktop: 5-col grid */}
        <div className="premium-panel p-4 sm:p-6">
            {/* Header: title centered on mobile, left on sm+ */}
            <div className="flex items-center justify-center sm:justify-between mb-4 sm:mb-5 gap-2">
                <S className="h-4 w-28" />
                <S className="hidden sm:block h-3.5 w-5" />
            </div>

            {/* Mobile: horizontal flex scroll */}
            <div className="flex gap-2 overflow-hidden sm:hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`flex-shrink-0 flex flex-col items-center rounded-2xl p-2.5 border gap-2
                            ${i === 0
                                ? 'bg-accent/8 border-accent/20'
                                : 'bg-zinc-50 dark:bg-[#18181b] border-zinc-200 dark:border-white/5'
                            }`}
                        style={{ width: 'calc((100vw - 5rem) / 3.8)' }}
                    >
                        <S className="h-2.5 w-10" />
                        <S className="h-9 w-9 rounded-xl" />
                        <S className="h-3.5 w-8" />
                        <S className="h-1 w-full rounded-full" />
                        <S className="h-3 w-6" />
                    </div>
                ))}
            </div>

            {/* Desktop: 5-col grid */}
            <div className="hidden sm:grid grid-cols-5 gap-3">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`flex flex-col items-center rounded-2xl p-4 border gap-2.5
                            ${i === 0
                                ? 'bg-accent/8 border-accent/20'
                                : 'bg-zinc-50 dark:bg-[#18181b] border-zinc-200 dark:border-white/5'
                            }`}
                    >
                        <S className="h-3 w-10" />
                        <S className="h-2.5 w-14" />
                        <S className="h-12 w-12 rounded-xl" />
                        <S className="h-2.5 w-14" />
                        <S className="h-5 w-10" />
                        <S className="h-1.5 w-full rounded-full" />
                        <S className="h-4 w-8" />
                    </div>
                ))}
            </div>
        </div>

        {/* ── Row 3: AQI | Solar Arc — 2-col on sm+ ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* AQI */}
            <div className="premium-panel p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <S className="h-4 w-24" />
                    <S className="h-6 w-16 rounded-md" />
                </div>
                <div className="flex items-center gap-4">
                    <S className="h-16 w-16 rounded-full flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                        <S className="h-3.5 w-28" />
                        <S className="h-3 w-full max-w-[180px]" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-zinc-50 dark:bg-[#18181b] rounded-xl p-2.5 space-y-1.5 border border-zinc-200 dark:border-white/5">
                            <S className="h-2.5 w-10 mx-auto" />
                            <S className="h-4 w-12 mx-auto" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Solar Arc */}
            <div className="premium-panel p-5 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                    <S className="h-4 w-20" />
                    <S className="h-5 w-24 rounded-full" />
                </div>

                {/* Arc SVG placeholder — responsive width, fixed aspect */}
                <div className="mt-auto">
                    <S className="w-full rounded-2xl" style={{ aspectRatio: '2.1 / 1' }} />

                    {/* Info row: Rise | Day | Set */}
                    <div className="grid grid-cols-3 gap-0 mt-3 pt-3 border-t border-zinc-100 dark:border-white/5">
                        <div className="space-y-1.5">
                            <S className="h-2.5 w-14" />
                            <S className="h-4 w-20" />
                        </div>
                        <div className="space-y-1.5 flex flex-col items-center">
                            <S className="h-2.5 w-8" />
                            <S className="h-4 w-16" />
                        </div>
                        <div className="space-y-1.5 flex flex-col items-end">
                            <S className="h-2.5 w-12" />
                            <S className="h-4 w-20" />
                        </div>
                    </div>

                    {/* Progress strip */}
                    <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <S className="h-2.5 w-36" />
                            <S className="h-2.5 w-8" />
                        </div>
                        <S className="h-1.5 w-full rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SkeletonLoader;
