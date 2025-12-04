import React from 'react';

const MobileNav = ({ currentView, onNavigate }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-black/5 dark:border-white/10 z-50 px-6 py-3 flex justify-between items-center transition-colors duration-300">
            <NavItem
                icon="🏠"
                label="Home"
                active={currentView === 'dashboard'}
                onClick={() => onNavigate('dashboard')}
            />
            <NavItem
                icon="⭐"
                label="Saved"
                active={currentView === 'favorites'}
                onClick={() => onNavigate('favorites')}
            />
            <NavItem
                icon="📊"
                label="Stats"
                active={currentView === 'analytics'}
                onClick={() => onNavigate('analytics')}
            />
            <NavItem
                icon="🗺️"
                label="Map"
                active={currentView === 'map'}
                onClick={() => onNavigate('map')}
            />
            <NavItem
                icon="⚙️"
                label="Settings"
                active={currentView === 'settings'}
                onClick={() => onNavigate('settings')}
            />
        </nav>
    );
};

const NavItem = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-slate-700 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
    >
        <div className={`p-1.5 rounded-full transition-all duration-300 ${active ? 'bg-blue-100 dark:bg-blue-900/30 shadow-sm shadow-blue-200 dark:shadow-blue-900/20' : 'bg-transparent'}`}>
            <span className="text-xl block">{icon}</span>
        </div>
        <span className={`text-[10px] font-medium ${active ? 'font-bold' : ''}`}>{label}</span>
    </button>
);

export default MobileNav;
