import React from 'react';
import {
    LayoutDashboard, Star, BarChart2, Map, Settings, Cloud
} from 'lucide-react';

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
    { icon: Star,            label: 'Favorites',  view: 'favorites' },
    { icon: BarChart2,       label: 'Analytics',  view: 'analytics' },
    { icon: Map,             label: 'Map',         view: 'map' },
    { icon: Settings,        label: 'Settings',   view: 'settings' },
];

const Sidebar = ({ currentView, onNavigate }) => (
    <aside className="hidden md:flex flex-col w-20 lg:w-60 h-screen bg-white dark:bg-[#0f0f11] border-r border-zinc-100 dark:border-white/[0.04] z-50 transition-colors duration-300 flex-shrink-0">


        {/* ── Navigation ── */}
        <nav className="flex-1 pt-5 pb-4 flex flex-col gap-0.5 px-2.5 overflow-y-auto">
            <p className="hidden lg:block label-caps px-2 mb-3">Navigation</p>
            {NAV_ITEMS.map(({ icon, label, view }) => (
                <NavItem
                    key={view}
                    icon={icon}
                    label={label}
                    active={currentView === view}
                    onClick={() => onNavigate(view)}
                />
            ))}
        </nav>

        {/* ── Footer ── */}
        <div className="px-3 py-4 border-t border-zinc-100 dark:border-white/[0.04] flex items-center justify-center lg:justify-start gap-3">
            {/* Icon — always visible */}
            <div className="w-8 h-8 rounded-xl bg-accent/10 dark:bg-accent/15 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <Cloud className="w-4 h-4 text-accent" strokeWidth={2} />
            </div>
            {/* Brand title — desktop only */}
            <div className="hidden lg:block">
                <p className="text-xs font-bold text-brand-900 dark:text-white tracking-tight leading-none">
                    Weather<span className="text-accent">Bun</span>
                </p>
                <p className="text-[10px] text-brand-400 dark:text-white/25 font-medium mt-0.5">v1.1.0</p>
            </div>
        </div>
    </aside>
);

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        title={label}
        className={`
            relative flex items-center justify-center lg:justify-start gap-3
            px-2.5 py-2.5 rounded-xl w-full text-left
            transition-all duration-150 outline-none
            focus-visible:ring-2 focus-visible:ring-accent/40
            ${active
                ? 'bg-accent/8 dark:bg-accent/10 border border-accent/15 dark:border-accent/10'
                : 'border border-transparent hover:bg-zinc-50 dark:hover:bg-white/[0.04] hover:border-zinc-100 dark:hover:border-white/5'
            }
        `}
    >
        {/* Active left bar */}
        {active && (
            <span className="absolute left-0 inset-y-2 w-[3px] rounded-r-full bg-accent" />
        )}

        {/* Icon container */}
        <span className={`
            flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg
            transition-all duration-150
            ${active
                ? 'bg-accent/15 dark:bg-accent/20 text-accent'
                : 'text-slate-500 dark:text-slate-500 group-hover:text-accent'
            }
        `}>
            <Icon className="w-[17px] h-[17px]" strokeWidth={active ? 2.25 : 1.75} />
        </span>

        {/* Label */}
        <span className={`
            hidden lg:block text-sm leading-none
            ${active
                ? 'font-semibold text-brand-900 dark:text-white'
                : 'font-medium text-brand-500 dark:text-slate-500 hover:text-brand-900 dark:hover:text-white'
            }
        `}>
            {label}
        </span>
    </button>
);

export default Sidebar;
