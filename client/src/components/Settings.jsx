import React from 'react';
import { Thermometer, Moon, Sun, Bell, Cloud } from 'lucide-react';
import UnitToggle from './UnitToggle';

/* Reusable toggle switch (dark mode, notifications etc.) */
const Toggle = ({ on, onToggle, disabled = false }) => (
    <button
        onClick={disabled ? undefined : onToggle}
        role="switch"
        aria-checked={on}
        disabled={disabled}
        className={`
            relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40
            ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
            ${on ? 'bg-accent' : 'bg-zinc-200 dark:bg-white/10'}
        `}
    >
        <span className={`
            absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm
            flex items-center justify-center
            transition-all duration-200
            ${on ? 'left-[22px]' : 'left-0.5'}
        `}>
            {on
                ? <Moon className="w-2.5 h-2.5 text-accent" strokeWidth={2.5} />
                : <Sun  className="w-2.5 h-2.5 text-slate-400" strokeWidth={2.5} />
            }
        </span>
    </button>
);

/* Setting row */
const SettingRow = ({ icon: Icon, title, description, control, disabled = false }) => (
    <div className={`flex items-center justify-between gap-6 ${disabled ? 'opacity-40' : ''}`}>
        <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-brand-500 dark:text-slate-400" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-semibold text-brand-900 dark:text-white leading-none truncate">{title}</p>
                <p className="label-caps mt-1">{description}</p>
            </div>
        </div>
        <div className="flex-shrink-0">{control}</div>
    </div>
);

const Settings = ({ unit, onToggleUnit, theme, onToggleTheme }) => (
    <div className="max-w-xl mx-auto animate-fade-in space-y-6">

        {/* Page header */}
        <div>
            <h2 className="text-xl font-bold text-brand-900 dark:text-white tracking-tight">Settings</h2>
            <p className="label-caps mt-1">Preferences &amp; display</p>
        </div>

        {/* Settings panel */}
        <div className="premium-panel divide-y divide-zinc-100 dark:divide-white/5">

            <div className="p-5">
                <SettingRow
                    icon={Thermometer}
                    title="Temperature Unit"
                    description="Celsius or Fahrenheit"
                    control={<UnitToggle unit={unit} onToggle={onToggleUnit} />}
                />
            </div>

            <div className="p-5">
                <SettingRow
                    icon={theme === 'dark' ? Moon : Sun}
                    title="Dark Mode"
                    description={theme === 'dark' ? 'Dark theme active' : 'Light theme active'}
                    control={
                        <Toggle on={theme === 'dark'} onToggle={onToggleTheme} />
                    }
                />
            </div>

            <div className="p-5">
                <SettingRow
                    icon={Bell}
                    title="Notifications"
                    description="Weather alerts — coming soon"
                    disabled
                    control={<Toggle on={false} disabled />}
                />
            </div>
        </div>

        {/* Version + developer footer */}
        <div className="flex flex-col items-center gap-2 py-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/8">
                <Cloud className="w-3 h-3 text-accent" strokeWidth={2} />
                <span className="text-xs font-semibold text-brand-500 dark:text-brand-400">WeatherBun v1.1.0</span>
            </div>
            <p className="text-[11px] text-brand-400 dark:text-white/25 font-medium">
                Developed by{' '}
                <span className="font-semibold text-brand-600 dark:text-white/40">Sumanth, ALIET</span>
            </p>
        </div>
    </div>
);

export default Settings;
