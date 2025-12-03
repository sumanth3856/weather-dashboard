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
        className={`flex flex-col items-center gap-1 ${active ? 'text-blue-600 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
    >
        <span className="text-xl">{icon}</span>
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default MobileNav;
