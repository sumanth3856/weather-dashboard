import React from 'react';
import UnitToggle from './UnitToggle';

const Settings = ({ unit, onToggleUnit, theme, onToggleTheme }) => {
    return (
        <div className="max-w-2xl mx-auto animate-fade-in space-y-8">
            <h2 className="text-2xl font-light text-slate-900 dark:text-white border-b border-black/5 dark:border-white/10 pb-4">Settings</h2>

            <div className="glass-panel p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Temperature Unit</h3>
                        <p className="text-slate-700 dark:text-slate-400 text-sm">Choose between Celsius and Fahrenheit</p>
                    </div>
                    <UnitToggle unit={unit} onToggle={onToggleUnit} />
                </div>

                <div className="border-t border-black/5 dark:border-white/5 pt-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Dark Mode</h3>
                        <p className="text-slate-700 dark:text-slate-400 text-sm">Toggle application theme</p>
                    </div>
                    <button
                        onClick={onToggleTheme}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${theme === 'dark' ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${theme === 'dark' ? 'left-7' : 'left-1'}`}></div>
                    </button>
                </div>

                <div className="border-t border-black/5 dark:border-white/5 pt-6 flex items-center justify-between opacity-50 cursor-not-allowed">
                    <div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Notifications</h3>
                        <p className="text-slate-700 dark:text-slate-400 text-sm">Enable weather alerts</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-700 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="text-center text-slate-700 text-xs mt-12">
                <p>WeatherBun v1.0.0</p>
                <p>© 2025 WeatherBun Inc.</p>
            </div>
        </div>
    );
};

export default Settings;
