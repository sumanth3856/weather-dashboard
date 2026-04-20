import React from 'react';
import { LayoutDashboard, Star, BarChart2, Map, Settings } from 'lucide-react';

const navItems = [
    { icon: LayoutDashboard, label: 'Home',     view: 'dashboard' },
    { icon: Star,            label: 'Saved',    view: 'favorites' },
    { icon: BarChart2,       label: 'Stats',    view: 'analytics' },
    { icon: Map,             label: 'Map',      view: 'map' },
    { icon: Settings,        label: 'Settings', view: 'settings' },
];

const MobileNav = ({ currentView, onNavigate }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 transition-colors duration-300">
            {/* Frosted glass bar */}
            <div className="bg-white/90 dark:bg-[#0f0f11]/90 backdrop-blur-md border-t border-zinc-100 dark:border-white/[0.05] px-2 py-2 flex justify-around items-center shadow-[0_-1px_0_0_rgba(0,0,0,0.04)] dark:shadow-none">
                {navItems.map(({ icon, label, view }) => (
                    <NavItem
                        key={view}
                        icon={icon}
                        label={label}
                        active={currentView === view}
                        onClick={() => onNavigate(view)}
                    />
                ))}
            </div>
        </nav>
    );
};

const NavItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-0.5 px-4 py-1 group outline-none"
    >
        {/* Icon container with micro-animation */}
        <div className={`
            relative p-2 rounded-xl transition-all duration-200 ease-out
            ${active
                ? 'bg-accent/10 dark:bg-accent/15 scale-110'
                : 'bg-transparent group-hover:bg-zinc-100 dark:group-hover:bg-white/5 group-hover:scale-110 group-hover:-translate-y-0.5'
            }
        `}>
            {/* Active dot */}
            {active && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent" />
            )}
            <Icon
                className={`w-5 h-5 transition-all duration-200 ${
                    active
                        ? 'text-accent'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-accent'
                }`}
                strokeWidth={active ? 2 : 1.75}
            />
        </div>
        <span className={`text-[10px] tracking-wide transition-colors duration-200 ${
            active
                ? 'font-bold text-brand-900 dark:text-white'
                : 'font-medium text-slate-400 dark:text-slate-500 group-hover:text-brand-700 dark:group-hover:text-slate-300'
        }`}>
            {label}
        </span>
    </button>
);

export default MobileNav;
